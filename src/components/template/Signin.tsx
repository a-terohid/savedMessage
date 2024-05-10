"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { AuthType } from "@/types/types";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SignInResponse, signIn } from "next-auth/react";

type s = {
    error?: string | undefined
    status?: number
    ok?: boolean
    url?: string | null
  }

const Signin =() => {

    const [ data , setData ] = useState<AuthType>({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState<boolean>(false);

    const { email, password } = data

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const signinHandler = async ( event: any ) => {

        event.preventDefault();

        setLoading( true );

        const res : Promise<s> | any = await signIn( "credentials" , {
            email,
            password,
            redirect: false,
        })

        setLoading(false);
        

        if ( res.error ) {
            toast.error( res.error );
        } else {
            router.push("/");
        }

    }

    return (
        <div className=" container flex flex-col h-[600px] items-center justify-center font-Exo_2" >
            <div className="border-dark border-2 w-fit p-7 shadow-xl md:w-96 bg-Dark text-Dark_gray rounded-lg" >
                <h4 className="text-2xl font-Grandstander text-Yellow font-bold" >Sign Up Form</h4>
                <form className="flex flex-col gap-y-6 mt-5" >
                    <Input 
                        value={ email }
                        name= "email"
                        changeHandler = {changeHandler}
                        label= "Email:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ password }
                        name="password"
                        changeHandler = {changeHandler}
                        label= "Password:"
                        type = "password"
                        textarea = {false} />
                   
                    {
                        loading ? <Loader /> :
                            <button type="submit" onClick={ signinHandler } className=" bg-Light_blue text-Dark rounded py-2" >sign in</button>
                    }
                    <div className="flex items-center justify-cente" >
                        <p>dont have an account? <Link href="/signup" className=" text-Yellow">sign up</Link></p>
                    </div>
                </form>
            </div>
           <Toaster />
        </div>
    );
};

export default Signin;