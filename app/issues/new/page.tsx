"use client";

// import dynamic from 'next/dynamic';
// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  // ssr: false,
  // });
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
import SimpleMdeReact from 'react-simplemde-editor';

interface IssueForm{
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, setError, formState: {errors, isSubmitting} } = useForm<IssueForm>();
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
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMdeReact placeholder="Description" {...field} />}
        />
        <Button disabled={isSubmitting} className='hover:cursor-pointer'>
          Submit New Issue
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage