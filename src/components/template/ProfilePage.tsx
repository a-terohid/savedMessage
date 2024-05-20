"use client"
import LogOutButtom from 'src/components/elements/LogOutButtom';
import { ProfilePageProps } from '@/types/types';
import Link from 'next/link';
import { MdDeleteForever } from "react-icons/md";
import { useState } from 'react';
import Loader from "@/module/Loader";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'

const ProfilePage = ( { user } : ProfilePageProps ) => {

    const { name , lastName , email , Categories  } = user
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const DeleteHandler = async ( category: String , event: any ) => {

        event.preventDefault()

        setLoading( true )


        const res = await fetch("/api/user/category" , {
            method: "DELETE",
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
        <div className='py-4 px-6' >
            <div className=' flex flex-col md:flex-row md:gap-x-14 lg:gap-x-20  md:py-6 flex-wrap py-3 border-b-2'>
                <div className='flex font-Grandstander flex-wrap items-center' >
                    <p className=' font-bold md:text-lg' >Name:</p>
                    { name ? <span className=' ml-3' >{ name }</span> : <span className=' ml-3 text-sm md:text-base italic text-orange ' >this filed is epmty!</span> } 
                </div>
                <div className='flex font-Grandstander flex-wrap items-center' >
                    <p className=' font-bold md:text-lg' >LastName:</p>
                    { lastName ? <span className=' ml-3' >{ lastName }</span> : <span className=' ml-3 text-sm md:text-base italic text-orange ' >this filed is epmty!</span> } 
                </div>
            </div>
            <div className=' flex flex-col md:flex-row md:gap-x-14 lg:gap-x-20  md:py-6 flex-wrap py-3 border-b-2'>
                <div className='flex font-Grandstander flex-wrap items-center' >
                    <p className=' font-bold md:text-lg' >Email:</p>
                    { email ? <span className=' ml-3' >{ email }</span> : <span className=' ml-3 text-sm md:text-base italic text-orange ' >this filed is epmty!</span> } 
                </div>
            </div>
            <div className=' flex flex-col md:gap-x-14 lg:gap-x-20  md:py-6 py-3 border-b-2'>
                <div className=' font-Grandstander' >
                    <p className=' font-bold md:text-lg' >Categories:</p>
                    {
                        loading ? <Loader /> : <div className=' flex-wrap flex ml-8 mt-3 gap-3 '>
                         { Categories.length ? 
                            Categories.map((categoty , index) => 
                                <p key={index} className='flex items-center  justify-center gap-x-1 bg-Yellow text-Dark text-xs md:text-base md:px-3 md:py-2 w-fit rounded-lg px-2 py-1' >{categoty}{categoty ==="Uncategorized"? null :<p> |</p>}{categoty ==="Uncategorized"? null : <MdDeleteForever onClick={() => DeleteHandler(categoty||"" , event)} className=' cursor-pointer text-lg' />}</p>) : <span className=' ml-3 text-sm md:text-base italic text-orange ' >You dont have any Categories!</span> } 
                     </div>
                    }
                </div>
                <div className='flex items-center justify-center mt-6' >
                    <Link href="/dashboard/profile/addCategoty" className=" bg-Dark text-Yellow font-bold md:px-12  px-6 py-1 text-sm md:font-bold md:text-base rounded-md ">Add Category</Link>
                </div>
            </div>
            <div className=' my-4 md:mt-10 flex items-center justify-center gap-x-4'>
                <Link href="/dashboard/profile/edit" className=' text-[#1b4332] bg-[#95d5b2] md:px-8 text-sm md:font-bold md:text-base   px-3 py-1 rounded-md ' >EditeProfile</Link>
                <LogOutButtom />
            </div>
            <Toaster />
        </div>
    );
};

export default ProfilePage;