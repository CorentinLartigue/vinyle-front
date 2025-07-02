import Navbar from "@components/shared/Navbar";
import Footer from "@components/shared/Footer";
import { AuthProvider } from "@/context/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <div className="overflow-x-hidden">
                <Navbar cartCount={0} />
                <main>{children}</main>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default Layout;
