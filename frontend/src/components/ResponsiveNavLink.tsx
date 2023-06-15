import React from 'react'
import Link, { LinkProps } from 'next/link'
import { PropsWithChildren, ButtonHTMLAttributes } from 'react'
interface Props extends LinkProps {
    active?: boolean,
}

const ResponsiveNavLink = ({
    active = false,
    children, 
    ...props
}: PropsWithChildren<Props>) => (
    <Link
        {...props}
        className={` items-center flex gap-3  w-full  py-2 text-lg active:bg-[#FEAF00] hover:bg-[#FEAF00]  ${
            active ? 'border-indigo-400 ' : ' border-transparent '
        } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}>
        {children}
    </Link>
)

export const ResponsiveNavButton = (
    props: ButtonHTMLAttributes<HTMLButtonElement>,
) => (
    <button
        className={`flex gap-3 w-full items-center px-6 py-2 text-lg active:bg-[#FEAF00] hover:bg-[#FEAF00] `}
        {...props}
    />
)

export default ResponsiveNavLink
