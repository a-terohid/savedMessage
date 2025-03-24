"use client"
import { ThreeDots } from 'react-loader-spinner';

const loading = () => {
    return (
        <div className='flex items-center justify-center h-[500px]' >
           <ThreeDots
                color="#FCA311"
                height={45}
                ariaLabel="three-dots-loading"
                visible={true}
                wrapperStyle={{ margin: "auto" }}
                />
        </div>
    );
};

export default loading;