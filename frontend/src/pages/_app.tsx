import 'tailwindcss/tailwind.css';
import React from 'react';
import type {AppProps}
from 'next/app';
import {useRouter} from 'next/router';

function App({Component, pageProps} : AppProps) { // suppress useLayoutEffect warnings when running outside a browser
    if (!process.browser) 
        React.useLayoutEffect = React.useEffect;
    


    const router = useRouter();
    // Made it work
    return (
        <div className='relative h-screen'>
            {/* Render a navigation menu */}
            <nav className='bg-yellow-500 sticky top-0'>
                <ul className='w-full flex justify-end gap-12 text-xl text-white px-12 py-6'>
                    <li onClick={
                            () => router.push('/dashboard')
                        }
                        className='cursor-pointer'>Home</li>
                    <li onClick={
                            () => router.push('/login')
                        }
                        className='cursor-pointer'>Login</li>
                    <li onClick={
                            () => router.push('/register')
                        }
                        className='cursor-pointer'>Register</li>
                </ul>
            </nav>

            {/* Render the component based on the current route */}
            <Component {...pageProps}/>
        </div>
    );
}

export default App;
