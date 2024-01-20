"use client";

import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillInfoCircle } from 'react-icons/ai';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
ssr: false,
});

interface IssueForm{
  title: string,
  description: string
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <div className='max-w-xl space-y-3'>
      { error && 
      <div>
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      </div>}
      <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data);
          router.push('/issues');
        } catch (error) {
          setError("An unexpected error occured. ");
        }
      })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')} />
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        <Button className='hover:cursor-pointer'>
          Submit New Issue
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage