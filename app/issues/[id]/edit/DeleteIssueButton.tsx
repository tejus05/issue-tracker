import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  return (
    <Link href='/'>
      <Button color='red' className='w-full hover:cursor-pointer'>
        Delete Issue 
      </Button>
    </Link>
  )
}

export default DeleteIssueButton