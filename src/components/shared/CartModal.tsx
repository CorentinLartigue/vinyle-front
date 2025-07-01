import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
    id: number;
    title: string;
    artist: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
}) => {

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity === 0) {
            onRemoveItem(id);
        } else {
            onUpdateQuantity(id, newQuantity);
        }
    };

    return (
        <>
            {/* Modal - Avec animation de slide */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl border-l border-gray-200 transform transition-all duration-300 ease-in-out ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header avec animation */}
                    <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-white transform transition-all duration-300 delay-100 ${
                        isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
                    }`}>
                        <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-5 h-5 text-orange-500" />
                            <h2 className="text-lg font-semibold">
                                Panier ({getTotalItems()} {getTotalItems() > 1 ? 'articles' : 'article'})
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Cart Items - Scrollable avec animation */}
                    <div className={`flex-1 overflow-y-auto p-4 transform transition-all duration-300 delay-150 ${
                        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                                <p className="text-lg font-medium mb-2">Votre panier est vide</p>
                                <p className="text-sm text-center">Ajoutez des vinyles pour commencer vos achats</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div 
                                        key={item.id} 
                                        className={`flex items-center space-x-3 bg-gray-50 p-3 rounded-lg transform transition-all duration-300 ${
                                            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                                        }`}
                                        style={{ 
                                            transitionDelay: isOpen ? `${200 + (index * 50)}ms` : '0ms'
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* Item Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm truncate">{item.title}</h3>
                                            <p className="text-xs text-gray-600 truncate">{item.artist}</p>
                                            <p className="text-sm font-semibold text-orange-500">
                                                {(item.price * item.quantity).toFixed(2)}€
                                            </p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex flex-col items-end space-y-2">
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                
                                                <span className="text-sm font-medium w-6 text-center">
                                                    {item.quantity}
                                                </span>
                                                
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer avec animation */}
                    {cartItems.length > 0 && (
                        <div className={`border-t border-gray-200 p-4 space-y-4 bg-white transform transition-all duration-300 delay-200 ${
                            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                            {/* Total */}
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">Total :</span>
                                <span className="text-xl font-bold text-orange-500">{getTotalPrice()}€</span>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                                <Link
                                    href="/cart"
                                    onClick={onClose}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors text-center block"
                                >
                                    Voir le panier
                                </Link>
                                <button
                                    onClick={onClose}
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Continuer les achats
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartModal;