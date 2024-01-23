"use client";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";


const Navbar = () => {

  return (
    <Container>
      <nav className='border-b mb-5 px-5 py-4'>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href='/'><AiFillBug /></Link>
            <NavLinks/>
          </Flex>
          <AuthStatus/>
        </Flex>
      </nav>
    </Container>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "unauthenticated") return (
    <Link href="/api/auth/signin" className='nav-link'>
      Log In
    </Link>
  );

  return (
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
    </Box>
  );
}

const NavLinks = () => {

  const currentPath = usePathname();

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
    <ul className='flex space-x-6'>
      {links.map(link => (
        <li key={link.label}>
          <Link className={classNames({
            'nav-link': true,
            '!text-zinc-900': link.href === currentPath,
          })} href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar