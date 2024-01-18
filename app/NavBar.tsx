import React from 'react'
import { IoBugSharp } from "react-icons/io5";
import Link from 'next/link'

const NavBar = () => {
    const links = [
        {label : 'Dashboard',href : '/'},
        {label : 'Issues',href : '/issues'},
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-7 items-center'>
       <Link href="/"><IoBugSharp /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>
                <Link 
                    key = {link.href}
                    className='text-zinc-500 hover:text-zinc-800 transition-colors' 
                    href={link.href}>{link.label}</Link> )}
        </ul>
    </nav>
  )
}

export default NavBar