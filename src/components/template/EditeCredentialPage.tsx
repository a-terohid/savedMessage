"use client"

import Input from '@/module/Input';
import Loader from '@/module/Loader';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";


const EditeCredentialPage = ({Credential , user}:any) => {

    const { _id,
            title,
            username, 
            password } = Credential

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [ CredentialsData , setCredentialsData ] = useState({
        _id,
        title ,
        username,
        password ,
    })


    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setCredentialsData({ ...CredentialsData , [ name ] : value })
    }

        const editeHandler = async ( event: any ) => {
    
            event.preventDefault()
    
            setLoading(true);
    
            const res = await fetch("/api/credentials", {
                method: "PATCH",
                body: JSON.stringify( CredentialsData ),
                headers: { "Content-Type": "application/json" },
            });
    
            const data = await res.json();
    
            setLoading(false);
    
            if (data.error) {
              toast.error(data.error);
            } else {
              toast.success(data.message);
              router.push( `/dashboard/my-credentials` )
            }
        }

        return (
            <div className="py-4 px-6" >
                <h1 className=" font-bold md:text-2xl text-xl mb-3 font-Exo_2" >Edit Credential</h1>
                <div className="flex flex-col gap-y-6 md:mr-9 md:ml-14 font-Grandstander" >
                    <Input
                        value={ CredentialsData.title }
                        name= "title"
                        changeHandler = {changeHandler}
                        label= "Title:"
                        type = "text"
                        textarea = {false} />
                    <Input
                        value={ CredentialsData.username }
                        name= "username"
                        changeHandler = {changeHandler}
                        label= "Username:"
                        type = "text"
                        textarea = {false} />
                    <Input
                        value={ CredentialsData.password }
                        name= "password"
                        changeHandler = {changeHandler}
                        label= "Password:"
                        type = "text"
                        textarea = {false} />
                </div>
                <div className="flex items-center justify-center mt-8 mb-4" >
                    {
                        loading ? <Loader/> 
                        : <button type="submit" onClick={ ( e ) => editeHandler( e ) } className=' text-[#1b4332] bg-[#95d5b2] md:px-8 text-sm md:font-bold md:text-base   px-3 py-1 rounded-md '>Edit</button>
                    }
                </div>
                <Toaster />
            </div>
        );
};

export default EditeCredentialPage;