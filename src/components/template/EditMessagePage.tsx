"use client"

import Input from '@/module/Input';
import Loader from '@/module/Loader';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

const EditMessagePage = ({Message , user}:any) => {

    const { Categories } = user

    const { _id,
            Title,
            Description, 
            Category } = Message

    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [ MessageData , setMessageData ] = useState({
        _id ,
        title : Title,
        description : Description,
        category : Category ,
    })

    

    const { title,
            description, 
            category,   } = MessageData

        
            

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
       setMessageData({ ...MessageData , [ name ] : value })
    }

    const editeHandler = async ( event: any ) => {

        event.preventDefault()

        setLoading(true);

        const res = await fetch("/api/messages", {
            method: "PATCH",
            body: JSON.stringify( MessageData ),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        setLoading(false);

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          router.push( `/dashboard/my-Messages/${ _id }` )
        }
    }


    return (
        <div className="py-4 px-6" >
            <h1 className=" font-bold md:text-2xl text-xl mb-3 font-Exo_2" >Edite Message</h1>
            <div className="flex flex-col gap-y-6 md:mr-9 md:ml-14 font-Grandstander" >
                <Input
                    value={ title }
                    name= "title"
                    changeHandler = {changeHandler}
                    label= "Title:"
                    type = "text"
                    textarea = {false} />
                <Input
                    value={ description }
                    name= "description"
                    changeHandler = {changeHandler}
                    label= "Description:"
                    type = "text"
                    textarea = {true} />
                    <div className="flex flex-col gap-y-2 ">
                    <label> Category:</label>
                    <select className="ml-4 rounded text-Dark py-2 pl-3 text-sm w-[200px]" name="category" value={category} onChange={changeHandler} >
                        <option value="Uncategorized" className="h-6"  >Uncategorized</option>
                        {
                            Categories.map((cat:any, index:any) => <option key={index}  value={`${cat}`} >{cat}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-center mt-8 mb-4" >
                {
                    loading ? <Loader/> 
                    : <button type="submit" onClick={ ( e ) => editeHandler( e ) }  className=" text-[#1b4332] bg-[#95d5b2]  font-bold md:px-16  px-6 py-1 rounded-md " >Edite</button>
                }
            </div>
            <Toaster />
        </div>
    );
};

export default EditMessagePage;