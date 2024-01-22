"use client";

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({issueId}:{issueId:number}) => {

  const router = useRouter();

  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' className='w-full hover:cursor-pointer' disabled={isDeleting}>
            Delete Issue {' '} {
              isDeleting && <Spinner />
            }
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Confirm Deletion
          </AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete? This action cannot be undone. 
          </AlertDialog.Description>
          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button color='gray' variant='soft' className='hover:cursor-pointer'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={
                async () => {
                  try {
                    setIsDeleting(true);
                    await axios.delete(`/api/issues/${issueId}`)
                    router.push('/issues');
                    router.refresh();
                  } catch (error) {
                    setIsDeleting(false);
                    setError(true);
                  }
                }
              } className='hover:cursor-pointer'>
                Delete Issue 
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>
              Error
          </AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted. 
          </AlertDialog.Description>
          <Button color='gray' variant='soft' className='hover:cursor-pointer' mt='2' onClick={() => {
            setError(false);
          }}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton