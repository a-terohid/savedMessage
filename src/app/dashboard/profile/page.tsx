import User from '@/models/User';
import ProfilePage from '@/template/ProfilePage';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {
    await connectDB();
    const session = await getServerSession( authOptions )
    const user = await User.findOne({ email : session?.user?.email })
    console.log(user);
    
    return ( <ProfilePage user={ user } /> );
};

export default page;