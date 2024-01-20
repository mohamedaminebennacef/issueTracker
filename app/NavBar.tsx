'use client' // because the hook is dependant on browser api

import React from 'react'
import Link from 'next/link'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation'; // hook
import classnames from 'classnames'
const NavBar = () => {
    const currentPath = usePathname(); // / /issues
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href="/">
                <IoBugSharp />
            </Link>
            <ul className='flex space-x-6'>
                {
                    links.map(link =>
                        <Link
                            key={link.href}
                            //className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
                            className = {classnames({
                                'text-zinc-900' : link.href === currentPath,
                                'text-zinc-500' : link.href != currentPath,
                                'hover:text-zinc-800 transition-colors':true // render this class all time

                            })}
                            href={link.href}> {link.label}
                        </Link>
                    )
                }
            </ul>
        </nav>
    )
}
export default NavBar   