'use client';

import React, { useState } from 'react';
import { Heart, Package, User, Edit2, Trash2, Eye } from 'lucide-react';

interface WishlistItem {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
  genre: string;
}

interface CartItem {
  id: number;
  title: string;
  artist: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderItem {
  title: string;
  artist: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Profil: React.FC = () => {
  const [activeTab, setActiveTab] = useState('wishlist');

  // Données d'exemple
  const wishlistItems: WishlistItem[] = [
    { id: 1, title: "Abbey Road", artist: "The Beatles", price: 29.99, image: "🎵", genre: "Rock" },
    { id: 2, title: "Kind of Blue", artist: "Miles Davis", price: 34.99, image: "🎷", genre: "Jazz" },
    { id: 3, title: "Thriller", artist: "Michael Jackson", price: 27.99, image: "🕺", genre: "Pop" }
  ];

  const orders: Order[] = [
    { 
      id: "CMD-001", 
      date: "2024-06-20", 
      status: "Livré", 
      total: 89.97, 
      items: [
        { title: "The Wall", artist: "Pink Floyd", price: 45.99 },
        { title: "Hotel California", artist: "Eagles", price: 43.98 }
      ]
    },
    { 
      id: "CMD-002", 
      date: "2024-06-15", 
      status: "En transit", 
      total: 67.98, 
      items: [
        { title: "Back in Black", artist: "AC/DC", price: 33.99 },
        { title: "Rumours", artist: "Fleetwood Mac", price: 33.99 }
      ]
    }
  ];

  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "06 12 34 56 78",
    address: "123 Rue de la Musique",
    city: "Bordeaux",
    postalCode: "33000",
    country: "France"
  });

  const tabs = [
    { id: 'wishlist', label: 'Ma Wishlist', icon: Heart, count: wishlistItems.length },
    { id: 'orders', label: 'Mes Commandes', icon: Package, count: orders.length },
    { id: 'profile', label: 'Mon Profil', icon: User }
  ];

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'Livré': 
        return 'bg-green-100 text-green-800';
      case 'En transit': 
        return 'bg-blue-100 text-blue-800';
      case 'En préparation': 
        return 'bg-yellow-100 text-yellow-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-16 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              👋
            </div>
            <div>
              <h1 className="text-3xl font-bold">Bonjour, {userProfile.firstName} !</h1>
              <p className="text-gray-100">Gérez votre compte DoVinyl</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Navigation verticale à gauche */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <h3 className="font-semibold text-lg">Navigation</h3>
              </div>
              <div className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full p-4 rounded-lg font-medium transition-all duration-200 mb-2 ${
                        activeTab === tab.id
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.count !== undefined && (
                          <span className={`px-2 py-1 rounded-full text-xs min-w-[20px] ${
                            activeTab === tab.id ? 'bg-white/20' : 'bg-orange-100 text-orange-600'
                          }`}>
                            {tab.count}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Ma Wishlist</h2>
                  <span className="text-sm text-gray-500">{wishlistItems.length} album{wishlistItems.length > 1 ? 's' : ''}</span>
                </div>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Votre wishlist est vide</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="bg-white border border-orange-200 rounded-lg p-4 flex items-center space-x-4 hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-2xl text-white">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-gray-600">{item.artist}</p>
                          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">{item.genre}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-600">{item.price}€</p>
                          <div className="flex space-x-2 mt-2">
                            <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                              Ajouter au panier
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Commandes */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mes Commandes</h2>
                  <span className="text-sm text-gray-500">{orders.length} commande{orders.length > 1 ? 's' : ''}</span>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Aucune commande trouvée</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">Commande #{order.id}</h3>
                            <p className="text-gray-600 text-sm">Passée le {new Date(order.date).toLocaleDateString('fr-FR')}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <p className="text-lg font-bold text-orange-600 mt-1">{order.total.toFixed(2)}€</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <span className="font-medium">{item.title}</span>
                                <span className="text-gray-600 ml-2">- {item.artist}</span>
                              </div>
                              <span className="text-orange-600 font-medium">{item.price}€</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex space-x-3 mt-4">
                          <button className="flex items-center space-x-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                            <Eye size={16} />
                            <span>Voir détails</span>
                          </button>
                          {order.status === 'Livré' && (
                            <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-md hover:bg-orange-50 transition-colors">
                              Racheter
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profil */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                    <Edit2 size={16} />
                    <span>Modifier</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 text-orange-800">Informations personnelles</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Prénom</label>
                        <p className="text-gray-800 font-medium">{userProfile.firstName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nom</label>
                        <p className="text-gray-800 font-medium">{userProfile.lastName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <p className="text-gray-800 font-medium">{userProfile.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Téléphone</label>
                        <p className="text-gray-800 font-medium">{userProfile.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 text-orange-800">Adresse de livraison</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Adresse</label>
                        <p className="text-gray-800 font-medium">{userProfile.address}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Ville</label>
                        <p className="text-gray-800 font-medium">{userProfile.city}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Code postal</label>
                        <p className="text-gray-800 font-medium">{userProfile.postalCode}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Pays</label>
                        <p className="text-gray-800 font-medium">{userProfile.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-orange-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-4 text-orange-800">Sécurité</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                      Changer le mot de passe
                    </button>
                    <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-md hover:bg-orange-50 transition-colors">
                      Supprimer le compte
                    </button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;