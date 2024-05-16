import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import User from '@/models/User';
import { ERROR } from '@/types/enum';
import DashboardLayout from '@/layout/DashboardLayout';
import { authOptions } from '@/utils/next-auth-config';
import connectDB from '@/utils/ConnectDB';

const layout = async ({ children }: {children: React.ReactNode}) => {

    await connectDB();
    const session = await getServerSession( authOptions )
    if ( !session ) redirect("/signin")

    const user = await User.findOne({ email : session?.user?.email })

    if( !user ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-lightBlue py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }

    return ( <DashboardLayout role={user.role} email={user.email}>{ children }</DashboardLayout> );
};

export default layout;