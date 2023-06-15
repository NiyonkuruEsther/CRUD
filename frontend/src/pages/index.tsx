import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
// import Login from './login'
import 'tailwindcss/tailwind.css';


export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            {/* <Link
                                href="/login"
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                Login
                            </Link> */}

                            {/* <Login /> */}

                            {/* <Link
                                href="/register"
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">
                                Register
                            </Link> */}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
