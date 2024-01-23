"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react"
import { Box } from '@radix-ui/themes';


const Navbar = () => {
  const currentPath = usePathname();

  const {status,data: session} = useSession();

  const links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues/list'
    }
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => (
          <li key={link.label}>
            <Link className={classNames({
              'text-zinc-900' : link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-700 transition-colors' : true
            })} href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <Box>
        {
          status === "authenticated" && (
            <Link href="/api/auth/signout">
              Log Out
            </Link>
          )
        }
        {
          status === "unauthenticated" && (
            <Link href="/api/auth/signin">
              Log In
            </Link>
          )
        }
      </Box>
    </nav>
  )
}

export default Navbar