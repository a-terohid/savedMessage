import PSCard from '@/module/PSCard';
import { ERROR } from '@/types/enum';
import React from 'react';

const MyCredentialsPage = ({userCredentials}:any) => {
    return (
        <div className="py-6 px-6 " >
            <p className="font-bold text-lg md:text-2xl mb-5 font-Exo_2" >My Credentials:</p>
            <div className='flex flex-wrap gap-6 items-center justify-center mb-2' >
                    { userCredentials.length ? null : 
                            <p className=' font-bold ml-5 mt-4 text-sm text-orange' >{ ERROR.NO_CR }</p> }
                    { userCredentials.map(( Credential : any ) => (
                        <PSCard key={ Credential._id } data={Credential}  dashboard={ true }  />))
                    }
                </div>
        </div>
    );
};

export default MyCredentialsPage;