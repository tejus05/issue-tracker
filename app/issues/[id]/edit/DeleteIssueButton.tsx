"use client";

import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({issueId}:{issueId:number}) => {

  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' className='w-full hover:cursor-pointer'>
          Delete Issue 
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
                await axios.delete(`/api/issues/${issueId}`)
                router.push('/issues');
                router.refresh();
              }
            } className='hover:cursor-pointer'>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton