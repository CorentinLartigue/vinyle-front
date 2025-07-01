import React from "react";
import Cart from "@/components/Cart";
import { useCart } from "@/hooks/useCart";

const Index: React.FC = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal
    } = useCart();

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

export default Index;