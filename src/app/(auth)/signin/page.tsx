import Signin from "@/template/Signin";
import connectDB from "@/utils/ConnectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( session ) redirect("/")

    return ( <Signin />  );
};

export default page;