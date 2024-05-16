
import MESSAGE from '@/models/Message';
import User from '@/models/User';
import { ROLE } from '@/types/enum';
import { dashboardLayoutProps } from '@/types/types';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { BsPersonCircle } from "react-icons/bs"
import { usePathname } from 'next/navigation'


const DashboardLayout = async ({ children , role , email }: dashboardLayoutProps ) => {

    await connectDB();
    const session = await getServerSession( authOptions)

    const user = await User.findOne({ email : session?.user?.email }) 

    let advertisments = []

    if( user.role != ROLE.USER  ) {
        advertisments = await MESSAGE.find({ Published: false , RejectNUM : 0 , Rejected : true })
    }


    const LinkStyle = "bg-pinkBrown min-w-fit px-3 py-1 rounded-lg text-sm font-bold lg:text-base flex gap-x-1 items-center "

    return (
        <div className=' container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-4 mt-4 pb-10 ' >
            <div className='flex font-Kanit overflow-auto gap-x-2 lg:flex-col lg:gap-y-3 h-fit bg-Dark text-Dark_gray lg:w-fit lg:min-w-[248px] py-2 lg:py-4 lg:px-4 rounded-xl shadow-xl' >
                <div className='lg:flex hidden flex-col items-center border-b-2 pb-3 border-[#8d99ae]' >
                    <BsPersonCircle className=" text-4xl mb-2 " />
                    <p className='text-Yellow mb-3 font-Grandstander' >{ email }</p>
                    { role == ROLE.OWNER ? <p className=' px-2 font-bold bg-[#e0aaff] text-[#5a189a] rounded-md' >owner</p> : null }
                </div>
                <Link className={ LinkStyle }  href="/dashboard" >Dashboard</Link>
                <Link className={ LinkStyle }  href="/dashboard/profile" >Profile</Link>
                <Link className={ LinkStyle }  href="/dashboard/my-Messages" >My Messages</Link>
                <Link className={ LinkStyle }  href="/dashboard/add-Messages" >Add Messagaes</Link>
                { role == ROLE.OWNER ? <Link className={ LinkStyle } href="/dashboard/users" >Users</Link> : null }
            </div>
            <div className=' bg-Dark_gray w-full rounded-xl shadow-xl' >{ children }</div>
        </div>
    );
};

export default DashboardLayout;