"use client"
import Input from '@/module/Input';
import Loader from '@/module/Loader';
import { ProfilePageProps } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AddCredentials = ()=> {

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [ AddCredentialsData , setAddCredentialsData ] = useState({
        title : "",
        username : "",
        password : "" ,
    })

    const { title,
            username,  
            password, 
            } = AddCredentialsData

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setAddCredentialsData({ ...AddCredentialsData , [ name ] : value })
        console.log(AddCredentialsData);
        
    }

    const clickHandler = async ( event: any ) => {

        event.preventDefault()

        setLoading(true);

        const res = await fetch("/api/credentials", {
            method: "POST",
            body: JSON.stringify( AddCredentialsData ),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        setLoading(false);

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          router.push( "/dashboard/my-credentials" )
        }
    }


    return (
        <div className="py-4 px-6" >
            <h1 className=" font-bold md:text-2xl text-xl mb-3 font-Exo_2" >Add Credential</h1>
            <div className="flex flex-col gap-y-6 md:mr-9 md:ml-14 font-Grandstander" >
                <Input
                    value={ title }
                    name= "title"
                    changeHandler = {changeHandler}
                    label= "Title:"
                    type = "text"
                    textarea = {false} />
                <Input
                    value={ username }
                    name= "username"
                    changeHandler = {changeHandler}
                    label= "Username:"
                    type = "text"
                    textarea = {false} />
                <Input
                    value={ password }
                    name= "password"
                    changeHandler = {changeHandler}
                    label= "Password:"
                    type = "text"
                    textarea = {false} />
            </div>
            <div className="flex items-center justify-center mt-8 mb-4" >
                {
                    loading ? <Loader/> 
                    : <button type="submit" onClick={ ( e ) => clickHandler( e ) } className=' text-[#1b4332] bg-[#95d5b2] md:px-8 text-sm md:font-bold md:text-base   px-3 py-1 rounded-md '>Add</button>
                }
            </div>
            <Toaster />
        </div>
    );
};

export default AddCredentials;