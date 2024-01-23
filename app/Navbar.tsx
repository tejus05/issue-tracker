"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';


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
    <Container>
      <nav className='border-b mb-5 px-5 py-4'>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {
              status === "authenticated" && (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar src={session.user!.image!} fallback="?" size="2" radius="full" className='cursor-pointer'
                    referrerPolicy='no-referrer'
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size="2">
                        {
                          session.user!.email
                        }
                      </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                      <Link href="/api/auth/signout">
                        Log Out
                      </Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
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
        </Flex>
      </nav>
    </Container>
  )
}

export default Navbar