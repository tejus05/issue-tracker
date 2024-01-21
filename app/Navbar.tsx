"use client";

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const pathname = usePathname();
  const links = [
    {
      label: 'Dashboard',
      href: '/'
    },
    {
      label: 'Issues',
      href: '/issues'
    }
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
      <Link href='/'><AiFillBug /></Link>
      <ul className='flex space-x-6'>
        {links.map(link => (
          <li key={link.label}>
            <Link className={classNames({
              'text-zinc-900' : link.href === pathname,
              'text-zinc-500': link.href !== pathname,
              'hover:text-zinc-700 transition-colors' : true
            })} href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar