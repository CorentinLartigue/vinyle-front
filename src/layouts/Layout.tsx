import Navbar from "@components/shared/Navbar";
import Footer from "@components/shared/Footer";
import CartModal from "@components/shared/CartModal";
import { useCart } from "@/context/CartProvider";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } = useCart();
    return (
        <div className="overflow-x-hidden">
            <Navbar cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />
            <CartModal
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
