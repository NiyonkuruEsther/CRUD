// import AppLayout from '@/components/Layouts/AppLayout'
import Home from '@/assets/Home'
import Students from '@/assets/Students'
import Navigation from '@/components/Layouts/Navigation'
import ResponsiveNavLink, {ResponsiveNavButton} from '@/components/ResponsiveNavLink'
import StudentTable from '@/components/StudentList'
import {useAuth} from '@/hooks/auth'
import Head from 'next/head'
import {useRouter} from 'next/router'
import {BiLogOut, BiUserCircle} from 'react-icons/bi'
import {GiTeacher} from 'react-icons/gi'
import {CgProfile} from 'react-icons/cg'

const Dashboard = () => {
    const router = useRouter()
    const {user} = useAuth({middleware: 'auth'})
    const {logout} = useAuth({middleware: 'auth'})

    return (
        <div className="grid grid-cols-5 h-screen">
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>
            <div className="bg-[#F2EAE1] py-12 flex flex-col items-center gap-10 w-full">
                <div className=" flex flex-col gap-4">
                    <BiUserCircle size={200}/>
                    <p className="text-center font-bold">
                        {
                        user ?. fname
                    }
                        {' '}
                        {
                        user ?. lname
                    } </p>
                </div>

                <div className="mt-3 space-y-1 w-fit grid grid-cols-1 justify-center">
                    <ResponsiveNavButton onClick={logout}>
                        <Home/>
                        Home
                    </ResponsiveNavButton>
                    <ResponsiveNavLink href={"/teachers"}
                        onClick={logout}>
                        <GiTeacher/>
                        Teachers
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={"/students"}
                        onClick={logout}>
                        <Students/>
                        Students
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href="/profile"
                        active={
                            router.pathname === '/profile'
                    }>
                        <CgProfile/>
                        Profile
                    </ResponsiveNavLink>
                    <ResponsiveNavButton onClick={logout}>
                        <BiLogOut/>
                        Logout
                    </ResponsiveNavButton>
                </div>
            </div>
            <div className="py-12 col-span-4">
                <StudentTable/>
            </div>
        </div>
    )
}

export default Dashboard
