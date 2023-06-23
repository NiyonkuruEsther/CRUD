import React, { PropsWithChildren } from 'react'
import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps {
    active: boolean
}

const NavLink = ({
    active = false,
    children,
    ...props
}: PropsWithChildren<Props>) => (
    <Link
        {...props}
        className={`flex items-center px-1 pt-1 border-b-2 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${
            active
                ? 'border-white text-white '
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700'
        }`}>
        {children}
    </Link>
)

export default NavLink
