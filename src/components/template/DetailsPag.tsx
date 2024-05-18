"use client"

import DeleteMsButton from "src/components/elements/DeleteMsButton";
import Link from "next/link";
import { DetailsPageProps } from "@/types/types";
import { MdContentCopy } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";


const DetailsPag = ({ Message , dashboard  } : DetailsPageProps ) => {

    const { Title, 
            Description,
            Category, 
            _id } = Message 

        
            const copyHandler = () => {
                navigator.clipboard.writeText(Description)
                toast.success("Description copied successfully!!");
            }
            

    return (
        <div className=" container bg-Dark_gray w-full rounded-xl py-3" >
            <div className="md:gap-x-36 mt-5 pb-4 border-b-2 font-Exo_2  " >
                <h1 className=" font-bold md:text-2xl text-lg" >{ Title }</h1>
                <p className=" text-xs mt-2 md:text-sm font-bold text-Light_blue " >{Category}</p>
            </div>
            <div className="py-4 border-b-2" >
                <p className=" font-bold md:text-lg text-sm text-orange" >Description: </p>
                <p className=" ml-4 text-xs md:text-base mt-3 whitespace-pre-wrap " >{ Description }</p>
            </div>
            <div className="flex py-4 gap-x-4 items-center justify-center" >
                <button onClick={copyHandler} className=' text-[#023e8a] bg-[#48cae4] flex items-center justify-center gap-x-2 md:px-8 text-sm md:font-bold md:text-base   px-3 py-1 rounded-md ' ><MdContentCopy /> Copy</button>
                {
                    dashboard ? 
                        <div className="flex gap-x-4 items-center justify-center">
                            <Link className=' text-[#1b4332] bg-[#95d5b2] md:px-8 text-sm md:font-bold md:text-base   px-3 py-1 rounded-md ' href={`/dashboard/my-Messages/${_id}/edite`} >Edite</Link>
                            <DeleteMsButton  _id={ _id } />
                        </div>
                    : null
                }
            </div>
            <Toaster />
        </div>
    );
};

export default DetailsPag;