"use client"

import Link from 'next/link';
import React, { useState } from 'react';
import { useSession } from "next-auth/react"
import { FiMenu } from "react-icons/fi"
import { IoCloseSharp } from "react-icons/io5"
import { IoPersonCircleOutline }  from "react-icons/io5";

const Navbar = () => {

    const [ flag , setFlag ] = useState(false)

    const clickHandler = () => { setFlag( !flag ) }

    const { status } = useSession();
    

    return (
        <div className=" bg-Dark text-f6 py-5 fixed w-full z-10 font-Grandstander" >
            <div className=' container items-center text-f6' >
                <div className='flex' >
                    <div className='sm:hidden flex-1 text-2xl' >
                        {
                            !flag ? <FiMenu onClick={ clickHandler } /> : <IoCloseSharp onClick={ clickHandler } />
                        }
                    </div>
                    <div className='hidden sm:flex gap-x-6 items-center  flex-1' >
                        {
                            status == "authenticated" ?
                                <Link  href="/dashboard" className="flex items-center gap-x-2" ><IoPersonCircleOutline className=" text-Yellow -mr-1 -mt-1 text-3xl"/>Dashboard</Link> 
                            :  <Link href="/signin" className=' bg-Yellow text-Dark px-3 py-2 rounded ' >Sign in</Link>

                        }
                        <Link href='/messages' >Messages</Link>
                        <Link href="/credentials" >Credentials</Link>
                    </div>
                    <div className='sm:text-2xl text-lg' >
                        <Link href="/" className=' font-Exo_2' >Saved Messages</Link>
                    </div>
                </div>
                {
                    flag ? <div className=' gap-y-4 flex flex-col py-4 ' >
                        <Link href='/messages'onClick={ clickHandler } >Messages</Link>
                        <Link href="/credentials" onClick={ clickHandler } >credentials</Link>
                        {
                            status == "authenticated" ?
                                <Link onClick={ clickHandler } href="/dashboard"className="flex items-center gap-x-2" ><IoPersonCircleOutline className=" text-Yellow -mr-1 -mt-1 text-3xl"/>Dashboard</Link> 
                            :  <Link onClick={ clickHandler } href="/signin" className=' bg-Yellow text-Dark px-6 py-1 rounded w-fit ' >Sign in</Link>

                        }
                    </div> : null
                }
            </div>
        </div>
    );
};

export default Navbar;