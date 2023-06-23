import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {ResponsiveNavButton} from '@/components/ResponsiveNavLink'
import {DropdownButton} from '@/components/DropdownLink'
import DropdownLink from '@/components/DropdownLink'
import {useAuth, User} from '@/hooks/auth'
import {useRouter} from 'next/router'
import {useState} from 'react'


const Navigation = (user? : User) => {
    const router = useRouter()
    const {logout} = useAuth({middleware: 'auth'})
    const [open, setOpen] = useState(false)

    return (
        <nav className=" bg-yellow-500 ">
            {/* Primary Navigation Menu */}

            {/* Responsive Navigation Menu */}

            <div className="block sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href="/dashboard"
                        active={
                            router.pathname === '/dashboard'
                    }>
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                {/* Responsive Settings Options */}
                <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="mt-3">
                        <ResponsiveNavLink href="/profile"
                            active={
                                router.pathname === '/profile'
                        }>
                            {/* <CgProfile /> */}
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavButton onClick={logout}>
                            Logout
                        </ResponsiveNavButton>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
