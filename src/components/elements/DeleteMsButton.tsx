"use client"

import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BsTrash3 } from "react-icons/bs"

const DeleteMsButton = ({ _id }:any) => {

    const router = useRouter();

    const deleteHandler = async () => {

        const res = await fetch(`/api/messages//${ _id }`, {
          method: "DELETE",
        });

        console.log("text");
        
    
        const result = await res.json();
        console.log(result);
    
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message);
          router.push( "/dashboard/my-Messages" );
        }
      }; 
    
    return (
        <div>
            <button onClick={ deleteHandler } className=' bg-[#ff8fa3] text-[#a4133c] text-sm md:font-bold md:text-base   md:px-8 flex gap-x-2 items-center  px-3 py-1 rounded-md ' ><BsTrash3 />Delete</button>
            <Toaster />
        </div>
    );
};

export default DeleteMsButton;