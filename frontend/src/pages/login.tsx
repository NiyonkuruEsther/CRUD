import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
// import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import {useAuth} from '@/hooks/auth'
import {useEffect, useState, FormEventHandler} from 'react'
import {useRouter} from 'next/router'
import PrimaryButton from '@/components/PrimaryButton'

const Login = () => {
    const {query} = useRouter()

    const {login} = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'})

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState < string | null > (null)

    useEffect(() => {
        const reset = query && query.reset ? (query.reset as string) : ''
        if (reset.length > 0 && errors.length === 0) {
            setStatus(atob(reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus
        })
    }

    return (
        <GuestLayout>
            <AuthCard>
                <div className="pb-6 flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-center">
                        Login in
                    </h1>
                    <p className="text-lg opacity-50 text-center">
                        Enter your credentials to access your account
                    </p>
                </div>
                {/* Session Status */}
                <AuthSessionStatus className="mb-4"
                    status={status}/>
                <form onSubmit={submitForm}
                    className="flex flex-col gap-5">
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input id="email" type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={
                                event => setEmail(event.target.value)
                            }
                            required
                            isFocused={true}/> {/* <InputError messages={errors.email} className="mt-2" /> */} </div>

                    {/* Password */}
                    <div className="">
                        <Label htmlFor="password">Password</Label>

                        <Input id="password" type="password"
                            value={password}
                            className="block mt-1 w-full"
                            onChange={
                                event => setPassword(event.target.value)
                            }
                            required
                            autoComplete="current-password"/> {/* <InputError
                            messages={errors.password}
                            className="mt-2"
                        /> */} </div>

                    {/* Remember Me */}
                    {/* <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <Checkbox
                                id="remember_me"
                                name="remember"
                                checked={shouldRemember}
                                onChange={event =>
                                    setShouldRemember(event.target.checked)
                                }
                            />
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div> */}
                    <PrimaryButton className="">Login</PrimaryButton>

                    <div className="flex items-center justify-between mt-4">
                        <Link href="/forgot-password" className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900  rounded-md ">
                            Forgot your password?
                        </Link>
                        <Link href="/register" className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900  rounded-md ">
                            Create an account?
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Login
