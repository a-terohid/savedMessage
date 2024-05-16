"use client"

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const LogOutButtom = () => {
    return ( <button className=' bg-[#ff8fa3] text-[#a4133c] text-sm md:font-bold md:text-base   md:px-8 flex gap-x-2 items-center  px-3 py-1 rounded-md ' onClick={ () => signOut() }>LogOut<FiLogOut /></button> );
};

export default LogOutButtom;