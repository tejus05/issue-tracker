"use client";

// import dynamic from 'next/dynamic';
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  // ssr: false,
  // });
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import SimpleMdeReact from 'react-simplemde-editor';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
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
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError("root",{message: "An unexpected error occured. "});
        }
      })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMdeReact placeholder="Description" {...field} />}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit New Issue
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage