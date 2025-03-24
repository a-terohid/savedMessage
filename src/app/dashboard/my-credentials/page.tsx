import User from '@/models/User';
import MyCredentialsPage from '@/template/MyCredentialsPage';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async () => {

        await connectDB();
        const session = await getServerSession( authOptions )
        const [user] = await User.aggregate([ 
            { $match: { email: session?.user?.email } } , 
            {
                $lookup: {
                    from: "saved-message-credentials",
                    foreignField: "UserId",
                    localField: "_id",
                    as: "Credentials",
                }
            }
        ])
    
        const userCredentials = user.Credentials;        

    return (<MyCredentialsPage userCredentials={userCredentials} />);
};

export default page;