import PSCard from '@/module/PSCard';
import { ERROR } from '@/types/enum';
import React from 'react';

const CredentialsPage = ({userCredentials}:any) => {
    return (
        <div className='container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-4 mt-4 pb-10' >
            <div className=' bg-Dark_gray w-full  rounded-xl shadow-xl py-8 px-6 ' >
                <div className='flex flex-wrap gap-6 items-center justify-center' >
                    { userCredentials.length ? null : 
                            <p className=' font-bold ml-5 mt-4 text-sm text-orange' >{ ERROR.NO_CR }</p> }
                    { userCredentials.map(( Credential : any ) => (
                        <PSCard key={ Credential._id } data={Credential}  />))
                    }
                </div>
            </div>
        </div>
    );
};

export default CredentialsPage;