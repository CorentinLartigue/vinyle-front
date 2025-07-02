import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, Eye, ArrowRight, Search, Tag } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    views: number;
    image: string;
    category: string;
    tags: string[];
    featured: boolean;
}

const Blog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

    const blogPosts: BlogPost[] = [
        {
            id: 1,
            title: "L'évolution du vinyle : De l'analogique au numérique et retour",
            excerpt: "Découvrez l'histoire fascinante du vinyle, de sa création à son grand retour dans l'ère numérique.",
            content: "Le vinyle a connu une histoire mouvementée...",
            author: "Marie Dubois",
            date: "2024-12-15",
            readTime: "8 min",
            views: 1247,
            image: "/api/placeholder/400/250",
            category: "Histoire",
            tags: ["vinyle", "histoire", "musique"],
            featured: true
        },
        {
            id: 2,
            title: "Comment choisir sa première platine vinyle",
            excerpt: "Guide complet pour débuter dans l'univers du vinyle avec les bonnes bases et le bon équipement.",
            content: "Choisir sa première platine peut sembler intimidant...",
            author: "Pierre Martin",
            date: "2024-12-10",
            readTime: "6 min",
            views: 892,
            image: "/api/placeholder/400/250",
            category: "Guide",
            tags: ["platine", "débutant", "équipement"],
            featured: false
        },
        {
            id: 3,
            title: "Les albums jazz incontournables en vinyle",
            excerpt: "Notre sélection des albums jazz essentiels à posséder absolument dans sa collection vinyle.",
            content: "Le jazz et le vinyle forment un duo parfait...",
            author: "Sophie Legrand",
            date: "2024-12-08",
            readTime: "10 min",
            views: 1034,
            image: "/api/placeholder/400/250",
            category: "Musique",
            tags: ["jazz", "albums", "collection"],
            featured: true
        },
        {
            id: 4,
            title: "Entretenir sa collection de vinyles : les bons gestes",
            excerpt: "Tous nos conseils pour préserver vos vinyles et maintenir une qualité d'écoute optimale.",
            content: "Un vinyle bien entretenu peut durer des décennies...",
            author: "Jean-Luc Moreau",
            date: "2024-12-05",
            readTime: "5 min",
            views: 756,
            image: "/api/placeholder/400/250",
            category: "Guide",
            tags: ["entretien", "conservation", "qualité"],
            featured: false
        },
        {
            id: 5,
            title: "Rock progressif : les pépites méconnues des années 70",
            excerpt: "Explorez les trésors cachés du rock progressif et enrichissez votre culture musicale.",
            content: "Les années 70 ont vu naître des chefs-d'œuvre...",
            author: "Marc Roussel",
            date: "2024-12-02",
            readTime: "12 min",
            views: 623,
            image: "/api/placeholder/400/250",
            category: "Musique",
            tags: ["rock", "progressif", "années 70"],
            featured: false
        },
        {
            id: 6,
            title: "Les éditions limitées qui valent le détour",
            excerpt: "Focus sur les éditions limitées et vinyles colorés qui font la joie des collectionneurs.",
            content: "Les éditions limitées créent l'émoi chez les collectionneurs...",
            author: "Laura Petit",
            date: "2024-11-28",
            readTime: "7 min",
            views: 945,
            image: "/api/placeholder/400/250",
            category: "Collection",
            tags: ["édition limitée", "collection", "vinyle coloré"],
            featured: false
        }
    ];

    const categories = ['Tous', 'Histoire', 'Guide', 'Musique', 'Collection'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPosts = blogPosts.filter(post => post.featured);
    const recentPosts = blogPosts.slice(0, 4);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
                    <h1 className="font-bold text-white text-[19px]">Blog DoVinyl</h1>
                    <div className="text-white/90 text-sm">
                        <Link href="/" className="hover:text-white cursor-pointer">Accueil</Link>
                        <span className="mx-2">-</span>
                        <span className="text-white/70">Blog</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section avec articles featured */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featuredPosts.slice(0, 2).map((post, index) => (
                            <div key={post.id} className={`relative group cursor-pointer ${index === 0 ? 'lg:row-span-2' : ''}`}>
                                <div className="relative h-64 lg:h-80 bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                                        <div className="flex items-center space-x-4 mb-3">
                                            <span className="bg-orange-500 px-3 py-1 rounded-full text-xs font-semibold">
                                                {post.category}
                                            </span>
                                            <div className="flex items-center space-x-2 text-sm opacity-90">
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                                            </div>
                                        </div>
                                        <h2 className={`font-bold mb-2 group-hover:text-orange-300 transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                                            {post.title}
                                        </h2>
                                        <p className="text-sm opacity-90 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{post.author}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.readTime}</span>
                                                </span>
                                            </div>
                                            <Link 
                                                href={`/blog/${post.id}`}
                                                className="flex items-center space-x-1 text-orange-300 hover:text-orange-200 transition-colors"
                                            >
                                                <span>Lire</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Search and Filters */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher un article..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                selectedCategory === category
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredPosts.map((post, index) => (
                                <article 
                                    key={post.id} 
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300"
                                    style={{
                                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-gray-800 to-black">
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                        
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            <div className="flex items-center space-x-4">
                                                <span className="flex items-center space-x-1">
                                                    <User className="w-4 h-4" />
                                                    <span>{post.author}</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{post.readTime}</span>
                                                </span>
                                            </div>
                                            <span className="flex items-center space-x-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{post.views}</span>
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Link 
                                                href={`/blog/${post.id}`}
                                                className="flex items-center space-x-1 text-orange-500 hover:text-orange-600 font-medium transition-colors"
                                            >
                                                <span>Lire</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun article trouvé</h3>
                                <p className="text-gray-600">Essayez avec d'autres mots-clés ou changez de catégorie.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Articles récents */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                                    Articles récents
                                </h3>
                                <div className="space-y-4">
                                    {recentPosts.map((post) => (
                                        <Link href={`/blog/${post.id}`} key={post.id} className="block group">
                                            <div className="flex space-x-3">
                                                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-lg flex-shrink-0"></div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">
                                                        {post.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString('fr-FR')}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Tags populaires */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center">
                                    <Tag className="w-5 h-5 mr-2 text-orange-500" />
                                    Tags populaires
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['vinyle', 'jazz', 'rock', 'collection', 'platine', 'guide', 'entretien', 'histoire'].map((tag) => (
                                        <span key={tag} className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Newsletter</h3>
                                <p className="text-sm opacity-90 mb-4">Recevez nos derniers articles directement dans votre boîte mail</p>
                                <div className="space-y-2">
                                    <input
                                        type="email"
                                        placeholder="Votre email"
                                        className="w-full px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none"
                                    />
                                    <button className="w-full bg-white text-orange-500 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                                        S'abonner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Blog;