import Card from '@/module/Card';
import { ERROR } from '@/types/enum';
import React from 'react';

const MyAdvertimessagePage = ({ userMessage }: any) => {
    // console.log(userMessage);
    
    return (
        <div className="py-6 px-6 " >
            <p className="font-bold text-lg md:text-2xl mb-5 font-Exo_2" >My Messages:</p>
            <div className='flex flex-wrap gap-6 items-center justify-center mb-2' >
                    { userMessage.length ? null : 
                            <p className=' font-bold ml-5 mt-4 text-sm text-orange' >{ ERROR.NO_ADS }</p> }
                    { userMessage.map(( message : any ) => (
                        <Card key={ message._id } data={message}  dashboard={ true }  />))
                    }
                </div>
        </div>
    );
};

export default MyAdvertimessagePage;