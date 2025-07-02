import React, { useEffect } from "react";
import Cart from "@/components/Cart";
import { useCart } from "@/context/CartProvider";
import { useProfile } from "@/context/ProfileProvider";
import { useRouter } from "next/router";

const CartPage: React.FC = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
    } = useCart();

    const profile = useProfile();
    const router = useRouter();

    useEffect(() => {
        if (profile === null) {
            router.replace("/login");
        }
    }, [profile, router]);

    if (profile === null) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Redirection vers la page de connexion...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Cart
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
                getCartTotal={getCartTotal}
            />
        </div>
    );
};

export default CartPage;