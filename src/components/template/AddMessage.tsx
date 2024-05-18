"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { ProfilePageProps } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";


const AddMessage = ({ user } : ProfilePageProps) => {

    const { Categories } = user
    
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [ AddMassegeData , setAddAdvertisementData ] = useState({
        title : "",
        description : ``,
        category : "Uncategorized" ,
    })

    const { title,
            description,  
            category, 
            } = AddMassegeData

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setAddAdvertisementData({ ...AddMassegeData , [ name ] : value })
        console.log(AddMassegeData);
        
    }

    const clickHandler = async ( event: any ) => {

        event.preventDefault()

        setLoading(true);

        const res = await fetch("/api/messages", {
            method: "POST",
            body: JSON.stringify( AddMassegeData ),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        setLoading(false);

        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          router.push( "/dashboard/my-Messages" )
        }
    }


    return (
        <div className="py-4 px-6" >
            <h1 className=" font-bold md:text-2xl text-xl mb-3 font-Exo_2" >Add advertisments</h1>
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
                    <select className="ml-4 rounded text-Dark py-2 pl-3 text-sm w-[200px]" name="category" onChange={changeHandler} >
                        <option value="Uncategorized" className="h-6"  selected >Uncategorized</option>
                        {
                            Categories.map((cat , index) => <option key={index}  value={`${cat}`} >{cat}</option>)
                        }
                    </select>
                </div>
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


export default AddMessage;