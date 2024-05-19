import message from '@/models/Message';
import User from '@/models/User';
import MessagesPage from '@/template/MessagesPage';
import connectDB from '@/utils/ConnectDB';
import { authOptions } from '@/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import React from 'react';

const page = async ({ searchParams }:any) => {

    await connectDB();
    const session = await getServerSession( authOptions )
    const [user] = await User.aggregate([ 
        { $match: { email: session?.user?.email } } , 
        {
            $lookup: {
                from: "saved-message-message",
                foreignField: "UserId",
                localField: "_id",
                as: "message",
            }
        }
    ])

    const userMessage = user.message;
    const Categories = user.Categories
    
    let finalData = userMessage;
    if (searchParams.category) {
        finalData = finalData.filter((i:any) => i.Category === searchParams.category);
    }

    return (<MessagesPage data={ finalData } categories={Categories} params={ searchParams.category } /> );
};

export default page;