"use client";

import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
// import SimpleMde from 'react-simplemde-editor';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import delay from 'delay';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage =async () => {
  const router = useRouter();
  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const onSubmit:SubmitHandler<IssueForm> = async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError("root",{message: "An unexpected error occured. "});
        }
      }

      await delay(2000)

  return (
    <div className='max-w-xl space-y-3'>
      { errors.root && 
      <div>
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {errors.root.message}
          </Callout.Text>
        </Callout.Root>
      </div>}
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit New Issue
          { isSubmitting && <Spinner/>}
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage