import {PropsWithChildren} from 'react'

const GuestLayout = ({children} : PropsWithChildren) => {
    return (
        <div className="w-full h-full">
            <div className="font-sans text-black antialiased">
                {children}</div>
        </div>
    )
}

export default GuestLayout
