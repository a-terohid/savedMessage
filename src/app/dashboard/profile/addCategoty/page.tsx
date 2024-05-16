import User from '@/models/User';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import AddCategory from "@/template/AddCategory";

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    const user = await User.findOne({ email : session?.user?.email })

    return (<AddCategory user={user} />);
};

export default page;