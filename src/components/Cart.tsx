import React from 'react';
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag, Gift, Shield, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "../context/ToastProvider";

interface CartItem {
    id: string | number;
    productName: string;
    artistInfos?: Array<{ name: string; bio?: string }>;
    price: number;
    quantity: number;
    imagePath?: string;
}

interface CartProps {
    cartItems: CartItem[];
    onUpdateQuantity: (id: string | number, quantity: number) => void;
    onRemoveItem: (id: string | number) => void;
    onClearCart: () => void;
    getCartTotal: () => number;
}

const Cart: React.FC<CartProps> = ({
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onClearCart,
    getCartTotal
}) => {
    const shippingCost = 3.90;
    const freeShippingThreshold = 60;
    const totalBeforeShipping = getCartTotal();
    const isEligibleForFreeShipping = totalBeforeShipping >= freeShippingThreshold;
    const finalTotal = totalBeforeShipping + (isEligibleForFreeShipping ? 0 : shippingCost);

    const { showError, showSuccess } = useToast();

    const handleQuantityChange = (id: string | number, newQuantity: number) => {
        if (newQuantity === 0) {
            onRemoveItem(id);
        } else {
            onUpdateQuantity(id, newQuantity);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
                    <h1 className="font-bold text-white text-[19px]">Panier</h1>
                    <div className="text-white/90 text-sm">
                        <Link href="/" className="hover:text-white cursor-pointer">Accueil</Link>
                        <span className="mx-2">-</span>
                        <span className="text-white/70">Panier</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {cartItems.length === 0 ? (
                    /* Panier vide */
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                                <ShoppingBag className="w-16 h-16 text-gray-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Votre panier est vide</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Découvrez notre collection exceptionnelle de vinyles et laissez-vous emporter par la magie du son authentique.
                            </p>
                            <Link 
                                href="/" 
                                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Découvrir nos vinyles
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Articles dans votre panier ({cartItems.length})
                                        </h2>
                                        <button
                                            onClick={onClearCart}
                                            className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors hover:bg-red-50 px-3 py-1 rounded"
                                        >
                                            Vider le panier
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {cartItems.map((item, index) => {
                                        const artistName = item.artistInfos && item.artistInfos.length > 0 
                                            ? item.artistInfos[0].name 
                                            : 'Artiste inconnu';
                                        
                                        return (
                                            <div 
                                                key={item.id} 
                                                className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200 bg-white"
                                                style={{
                                                    animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                                                }}
                                            >
                                                {/* Image */}
                                                <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                                                        <div className="w-5 h-5 bg-black rounded-full"></div>
                                                    </div>
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-xl text-gray-800 mb-1">{item.productName}</h3>
                                                    <p className="text-gray-600 mb-2">{artistName}</p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-lg font-bold text-orange-500">{item.price}€</span>
                                                        <span className="text-sm text-gray-500">l'unité</span>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-colors shadow-sm"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        
                                                        <span className="text-lg font-semibold w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center transition-colors shadow-sm"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => onRemoveItem(item.id)}
                                                        className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Supprimer l'article"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="text-right min-w-0">
                                                    <p className="text-xl font-bold text-orange-500">
                                                        {(item.price * item.quantity).toFixed(2)}€
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {item.quantity > 1 && `${item.quantity} × ${item.price}€`}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Continue Shopping */}
                            <div className="mt-6">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Continuer mes achats
                                </Link>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                                <h3 className="text-xl font-bold mb-6 text-gray-800">Résumé de la commande</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Sous-total</span>
                                        <span className="font-semibold">{totalBeforeShipping.toFixed(2)}€</span>
                                    </div>
                                    
                                    <div className="flex justify-between py-2">
                                        <span className="text-gray-600">Livraison</span>
                                        <span className="font-semibold">
                                            {isEligibleForFreeShipping ? (
                                                <span className="text-green-600 font-bold">Gratuite !</span>
                                            ) : (
                                                <span>{shippingCost.toFixed(2)}€</span>
                                            )}
                                        </span>
                                    </div>
                                    
                                    {!isEligibleForFreeShipping && (
                                        <div className="text-sm text-gray-500 bg-green-50 p-3 rounded-lg">
                                            <div className="flex items-center">
                                                <Gift className="w-4 h-4 mr-2 text-green-600" />
                                                <span>
                                                    Plus que {(freeShippingThreshold - totalBeforeShipping).toFixed(2)}€ pour la livraison gratuite !
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-800">Total</span>
                                            <span className="text-xl font-bold text-orange-500">{finalTotal.toFixed(2)}€</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Security & Payment Info */}
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Shield className="w-4 h-4 mr-2" />
                                        <span>Paiement sécurisé</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        <span>Cartes acceptées</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition-colors mt-6 shadow-lg hover:shadow-xl"
                                    onClick={() => {
                                        showSuccess('Fonctionnalité de paiement à venir !');
                                    }}
                                >
                                    Procéder au paiement
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Cart;