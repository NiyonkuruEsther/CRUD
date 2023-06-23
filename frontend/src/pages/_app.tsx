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


            {/* Render the component based on the current route */}
            <Component {...pageProps}/>
        </div>
    );
}

export default App;
