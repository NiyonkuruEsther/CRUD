import {PropsWithChildren} from 'react'
import ApplicationLogo from './ApplicationLogo'

const AuthCard = ({children} : PropsWithChildren) => (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-bl from-[#F8D442] to-[#FEAF00]">
        <div className="mt-6 p-10 w-2/5 bg-white shadow-md overflow-hidden sm:rounded-lg">
            {children} </div>
    </div>
)

export default AuthCard
