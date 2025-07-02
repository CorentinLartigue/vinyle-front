import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface CartItem {
    id: string | number;
    productName: string;
    artistInfos?: Array<{ name: string; bio?: string }>;
    price: number;
    quantity: number;
    imagePath?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    updateQuantity: (id: string | number, quantity: number) => void;
    removeFromCart: (id: string | number) => void;
    clearCart: () => void;
    getCartCount: () => number;
    getCartTotal: () => number;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'dovinyl_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { user } = useAuth();

    // Charger le panier depuis le localStorage au montage
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            }
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
        }
    }, []);

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
            } else {
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du panier:', error);
        }
    }, [cartItems, user]);

    const addToCart = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    }, []);

    const updateQuantity = useCallback((id: string | number, quantity: number) => {
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

    const removeFromCart = useCallback((id: string | number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    }, []);

    const getCartCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getCartTotal = useCallback(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);

    const value: CartContextType = {
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

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 