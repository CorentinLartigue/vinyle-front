import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, Search, User, Heart, ChevronDown } from 'lucide-react';
import Gramophone from '@/assets/gramophone.png'
import Image from 'next/image';
import CartModal from '@/components/shared/CartModal';
import { useCart } from '@/hooks/useCart';

const Navbar: React.FC = () => {
    const router = useRouter();
    const {
        cartItems,
        isCartOpen,
        updateQuantity,
        removeFromCart,
        getCartCount,
        openCart,
        closeCart
    } = useCart();

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4">
                    <nav className="hidden lg:flex justify-center py-3 border-b border-gray-200">
                        <div className="flex space-x-8">
                            <Link href="/" className={`transition-colors font-medium ${router.pathname === '/' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                Accueil
                            </Link>
                            <div className="relative group">
                                <Link href="/category" className={`transition-colors flex items-center font-medium ${router.pathname === '/category' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                    Catégories
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            <div className="relative group">
                                <Link href="/product" className={`transition-colors flex items-center font-medium ${router.pathname === '/product' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                    Produits
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            <div className="relative group">
                                <Link href="/blog" className={`transition-colors flex items-center font-medium ${router.pathname === '/blog' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                    Blog
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            <div className="relative group">
                                <Link href="/account" className={`transition-colors flex items-center font-medium ${router.pathname === '/account' ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}>
                                    Compte
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </nav>

                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-2">
                            <Link href="/">
                                <div className="flex items-center space-x-2 cursor-pointer">
                                    <Image
                                        className="w-10 h-10 rounded-full"
                                        src={Gramophone}
                                        alt="Logo DoVinyl"
                                    />
                                    <span className="text-2xl font-bold text-black">DoVinyl</span>
                                </div>
                            </Link>
                        </div>

                        <div className="flex-1 flex justify-center max-w-2xl mx-8">
                            <div className="flex w-full">
                                <input
                                    type="text"
                                    placeholder="Rechercher des articles..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                                />
                                <button className="px-4 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-900 transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <Link href="/login" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors">
                                <User className="w-5 h-5" />
                                <span className="hidden lg:block text-sm">Connexion</span>
                            </Link>
                            <Link href="/wishlist" className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors">
                                <Heart className="w-5 h-5" />
                                <span className="hidden lg:block text-sm">Favoris</span>
                            </Link>
                            <button 
                                onClick={openCart}
                                className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors relative"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="hidden lg:block text-sm">Panier</span>
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Cart Modal */}
            <CartModal
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
        </>
    );
};

export default Navbar;