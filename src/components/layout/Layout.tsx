import Footer from "@/module/Footer";
import Navbar from "@/module/Navbar";

const Layout = ({ children } : {children: React.ReactNode}) => {
    return (
        <div >
            <Navbar />
            <div className=" min-h-[700px]  pt-[90px] pb-16 bg-f6" >{ children }</div>
            <Footer />
        </div>
    );
};

export default Layout;