import Signup from "@/template/Signup";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import connectDB from "@/utils/ConnectDB";
import { authOptions } from "@/utils/next-auth-config";


const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    if ( session ) redirect("/")

    return ( <Signup /> );
};

export default page;