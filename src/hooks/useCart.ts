import { useState, useCallback } from 'react';

interface CartItem {
    id: number;
    title: string;
    artist: string;
    price: number;
    quantity: number;
    image: string;
}

export const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            title: 'Abbey Road',
            artist: 'The Beatles',
            price: 24.99,
            quantity: 1,
            image: '/api/placeholder/200/200'
        },
        {
            id: 2,
            title: 'Kind of Blue',
            artist: 'Miles Davis',
            price: 31.99,
            quantity: 2,
            image: '/api/placeholder/200/200'
        }
    ]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = useCallback((product: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const removeFromCart = useCallback((id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const getCartCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getCartTotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    return {
        cartItems,
        isCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
        openCart,
        closeCart
    };
};