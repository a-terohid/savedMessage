"use client"

import { ProfilePageProps } from "@/types/types";
import Input from "@/module/Input";
import { useState } from "react";
import Loader from "@/module/Loader";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'

const EditrUserPage = ( { user } : ProfilePageProps ) => {

    const { Categories } = user

    const [ category , setCategory ] = useState("")
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        const {  value } = event.target
        setCategory(value)
    }

    const AddHandler = async ( event: any ) => {

        event.preventDefault()

        setLoading( true )

        const res = await fetch("/api/user/category" , {
            method: "POST",
            body : JSON.stringify( {category} ),
            headers: { "Content-Type": "application/json" },
        })

        const resData = await res.json()
        console.log( resData );

        setLoading( false );

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.refresh()

        }

    }

    return (
        <div className="py-4 px-6" >
            <h1 className=" font-bold text-2xl mb-4 font-Exo_2" >Add Category</h1>
            <div className="flex flex-col gap-y-6 md:ml-14 font-Grandstander" >
                <Input
                    value={ category || "" }
                    name= "title"
                    changeHandler = {changeHandler}
                    label= "Title:"
                    type = "text"
                    textarea = {false} />
            </div>
            <div className="flex items-center justify-center my-8 " >
                {
                    loading ? <Loader/> 
                    : <button type="submit" onClick={ ( e ) => AddHandler( e ) } className=" bg-Dark text-Yellow font-bold md:px-16  px-6 py-1 rounded-md " >ADD</button>
                }
            </div>
            <div className=' flex flex-col md:gap-x-14 lg:gap-x-20  md:py-4 py-3 border-t-2'>
                <div className=' font-Grandstander' >
                    <p className=' font-bold md:text-lg' >Categories:</p>
                    <div className='flex ml-8 mt-3 gap-3 '>
                        { Categories.length ? Categories.map((categoty , index) => <p key={index} className=' bg-Yellow text-Dark text-xs md:text-base md:px-3 md:py-2 w-fit rounded-lg px-2 py-1' >{categoty}</p>) : <span className=' ml-3 text-sm md:text-base italic text-orange ' >You dont have any Categories!</span> } 
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default EditrUserPage;