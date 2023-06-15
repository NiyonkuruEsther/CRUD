import AuthCard from '@/components/AuthCard'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
// import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import {useAuth} from '@/hooks/auth'
import {useState, FormEventHandler} from 'react'
import Head from 'next/head'
import PrimaryButton from '@/components/PrimaryButton'

const Register = () => {
    const {register} = useAuth({middleware: 'guest', redirectIfAuthenticated: '/dashboard'})

    const [name, setName] = useState({fname: '', mname: '', lname: ''})
    const [email, setEmail] = useState('')
    const [phone_no, setPhone_no] = useState("");
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm: FormEventHandler = event => {
        event.preventDefault()

        register({
            fname: name.fname,
            mname: name.mname,
            lname: name.lname,
            email,
            password,
            phone_no: Number(phone_no),

            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus: () => {}
        })
    }

    return (
        <GuestLayout>
            <Head>
                <title>Laravel - Register</title>
            </Head>
            <AuthCard>
                <form onSubmit={submitForm}
                    className="flex flex-col gap-6">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name">First Name</Label>

                        <Input id="name" type="text"
                            value={
                                name.fname
                            }
                            className="block mt-1 w-full"
                            onChange={
                                event => setName({
                                    ...name,
                                    fname: event.target.value
                                })
                            }
                            required
                            autoFocus/> {/* <InputError messages={errors.name} className="mt-2" /> */} </div>
                    <div className='flex w-full justify-between'>
                        <div>
                            <Label htmlFor="name">Middle Name</Label>

                            <Input id="name" type="text"
                                value={
                                    name.mname
                                }
                                className="block mt-1 w-full"
                                onChange={
                                    event => setName({
                                        ...name,
                                        mname: event.target.value
                                    })
                                }
                                required
                                autoFocus/> {/* <InputError messages={errors.name} className="mt-2" /> */} </div>
                        <div>
                            <Label htmlFor="name">Last Name</Label>

                            <Input id="name" type="text"
                                value={
                                    name.lname
                                }
                                className="block mt-1 w-full"
                                onChange={
                                    event => setName({
                                        ...name,
                                        lname: event.target.value
                                    })
                                }
                                required
                                autoFocus/> {/* <InputError messages={errors.name} className="mt-2" /> */} </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Phone Number</Label>

                        <Input id="phone_no" type="number"
                            value={phone_no}
                            className="block mt-1 w-full"
                            onChange={
                                event => setPhone_no(event.target.value)
                            }
                            required/> {/* <InputError messages={errors.email} className="mt-2" /> */} </div>
                    {/* Phone  Number */}
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input id="email" type="email"
                            value={email}
                            className="block mt-1 w-full"
                            onChange={
                                event => setEmail(event.target.value)
                            }
                            required/> {/* <InputError messages={errors.email} className="mt-2" /> */} </div>

                    {/* Password */}

                    <div className='flex w-full justify-between'>
                        <div>
                            <Label htmlFor="password">Password</Label>

                            <Input id="password" type="password"
                                value={password}
                                className="block mt-1 w-full"
                                onChange={
                                    event => setPassword(event.target.value)
                                }
                                required
                                autoComplete="new-password"/> {/* <InputError
                            messages={errors.password}
                            className="mt-2"
                        /> */} </div>

                        {/* Confirm Password */}
                        <div>
                            <Label htmlFor="passwordConfirmation">
                                Confirm Password
                            </Label>

                            <Input id="passwordConfirmation" type="password"
                                value={passwordConfirmation}
                                className="block mt-1 w-full"
                                onChange={
                                    event => setPasswordConfirmation(event.target.value)
                                }
                                required/> {/* <InputError
                            messages={errors.password_confirmation}
                            className="mt-2"
                        /> */} </div>
                    </div>


                    <PrimaryButton>Register</PrimaryButton>

                    <div className="flex items-center justify-end mt-4">
                        <Link href="/login" className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900  ">
                            Already registered?
                        </Link>
                    </div>
                </form>
            </AuthCard>
        </GuestLayout>
    )
}

export default Register
