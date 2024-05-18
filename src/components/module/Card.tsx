"use client"
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { MdContentCopy } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";

import { cardProps } from "@/types/types";


const Card = ({ data , dashboard = false , waiting = false , admin = false , userID }: cardProps ) => {

    const { _id, Title, Description, Category, } = data

    const copyHandler = () => {
        navigator.clipboard.writeText(Description)
        toast.success("Description copied successfully!!");
    }
    

    return (
        <div className=" w-64 px-4 py-3 bg-Dark text-f6 rounded-md shadow-md h-[250px] md:h-[300px] font-Grandstander" >
            <div className=" mb-4">
                <p className=" font-bold md:text-lg text-Yellow " >{ Title }</p>
                <p className=" text-xs text-Light_blue md:text-sm" >{ Category }</p>

            </div>
            <div className=" flex flex-col gap-y-4 px-2 w-full text-justify h-[150px] text-sm" >
                <p className="flex gap-x-2 items-start text-xs  overflow-hidden  text-ellipsis  md:text-base font-Kanit" >{ Description }</p>
            </div>
            <div className="flex justify-between mt-3" >
                <p className="text-sm text-Red" onClick={copyHandler} ><MdContentCopy />
</p>
                {
                    !dashboard? 
                         <Link href={`/my-Messages/${_id}`} className="flex gap-x-1 text-orange items-center text-xs" ><BiLeftArrowAlt />See Message</Link>
                    : 
                     <Link href={`/dashboard/my-Messages/${_id}`} className="flex gap-x-1 text-orange items-center text-xs" ><BiLeftArrowAlt />See Message</Link>
                    
                }
            </div>
            <Toaster />
        </div>
    );
};

export default Card;