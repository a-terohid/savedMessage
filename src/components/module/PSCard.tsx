"use client"

import Link from 'next/link';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';



const PSCard = ({ data , dashboard = false , waiting = false , admin = false , userID }:any) => {

    const { _id, title , username , password} = data

    const router = useRouter();

    const copyHandler = (val: string , ms:string) => {
            navigator.clipboard.writeText(val)
            toast.success(`${ms} copied successfully!!`);
    }

    const deleteHandler = async () => {

        if (confirm("do you want delete this credential? ") == false) {
            return
          } 

        const res = await fetch(`/api/credentials/${ _id }`, {
          method: "DELETE",
        });
    
        const result = await res.json();
        console.log(result);
    
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message);
          router.push( "/dashboard/my-credentials" );
        }
      }; 

    return (
        <div className=" w-64 px-4 py-3 bg-Dark text-f6 rounded-md shadow-md  font-Grandstander" >
            <div className=" mb-4">
                <p className=" font-bold md:text-lg text-Yellow " >{ title }</p>
            </div>
            <div className=" flex flex-col gap-y-3 px-2 w-full text-justify h-[100px] md:text-sm text-xs" >
                <p className="text-Light_blue flex gap-x-2 items-center" ><span className=" text-xl  text-Light_blue hover:cursor-pointer hover:text-f6 hover:text-2xl " onClick={() => copyHandler(username , "Username")} ><MdContentCopy  /></span> username: { username }</p>
                <p className=" flex gap-x-2 items-center" ><span className=" text-xl hover:cursor-pointer hover:text-f6 hover:text-2xl " onClick={() => copyHandler(password , "Password")} ><MdContentCopy  /></span> password: { password }</p>
            </div>
            <div className="flex justify-between mt-3 px-3" >
                {
                    dashboard? 
                        <div className='flex items-center gap-x-3 mb-2'>
                            <Link href={`/dashboard/my-credentials/${_id}/edit`} className="hover:text-lg hover:text-Light_blue" ><FiEdit /></Link>
                            <button onClick={deleteHandler} className=" hover:text-lg hover:text-red-600" ><RiDeleteBin5Line/></button>
                        </div>
                    : null
                }
            </div>
            <Toaster />
        </div>
    );
};

export default PSCard;