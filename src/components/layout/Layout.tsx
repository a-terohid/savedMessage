import Footer from "@/module/Footer";
import Navbar from "@/module/Navbar";

const Layout = ({ children } : {children: React.ReactNode}) => {
    return (
        <div >
            <Navbar />
            <div className=" min-h-[750px]  pt-[90px] pb-16 bg-[#343a40]" >{ children }</div>
            <Footer />
        </div>
    );
};

export default Layout;