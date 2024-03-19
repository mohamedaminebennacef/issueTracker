'use client' // do not render this page on the server rather only in the browser
import React from 'react'
import Link from 'next/link'
import { IoBugSharp } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, Flex, Text } from '@radix-ui/themes';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/list' },
    ]
    return (
        <nav className=' border-b mb-5 px-5 py-3 '>
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="3">
                        <Link href="/">
                            <IoBugSharp />
                        </Link>
                        <ul className='flex space-x-6'>
                            {
                                links.map(link =>
                                    <li key={link.href}>
                                        <Link
                                            className={classnames({
                                                'text-zinc-900': link.href === currentPath,
                                                'text-zinc-500': link.href != currentPath,
                                                'hover:text-zinc-800 transition-colors': true
                                            })}
                                            href={link.href}> {link.label}
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar src={session.user!.image!} fallback="?" size="2" radius="full" className='cursor-pointer'/>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size="2">
                                            {session.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item className='cursor-pointer transition duration-100 ease-in-out'>
                                        <Link href="/api/auth/signout">Log out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )}
                        {status === "unauthenticated" && (<Link href="/api/auth/signin">Login</Link>)}
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}
export default NavBar   