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
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import { z } from 'zod';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof createIssueSchema>

interface Props {
  issue?: Issue
}

const IssueForm = ({issue}:Props) => {
  const router = useRouter();
  const { register, control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  });

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      }
      else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues');
    } catch (error) {
      setError("root", { message: "An unexpected error occured. " });
    }
  }

  return (
    <div className='max-w-xl space-y-3'>
      {errors.root &&
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
          <TextField.Input placeholder='Title' {...register('title')} defaultValue={issue?.title}/>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        /> 
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          {
            issue ? "Update Issue" : "Submit New Issue"
          }
          {' '}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm