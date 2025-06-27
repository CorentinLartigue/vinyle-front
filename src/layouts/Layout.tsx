import Navbar from "@components/shared/Navbar";
import Footer from "@components/shared/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-x-hidden">
            <Navbar cartCount={0} />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
