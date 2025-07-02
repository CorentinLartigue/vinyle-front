import React from 'react';
import Link from 'next/link';
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, Heart, MessageCircle, Tag } from 'lucide-react';

interface BlogPostData {
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
}

interface BlogPostProps {
    postId: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ postId }) => {
    // En réalité, vous récupéreriez les données depuis une API
    const blogPosts: BlogPostData[] = [
        {
            id: 1,
            title: "L'évolution du vinyle : De l'analogique au numérique et retour",
            excerpt: "Découvrez l'histoire fascinante du vinyle, de sa création à son grand retour dans l'ère numérique.",
            content: `
                <p>Le vinyle a connu une histoire mouvementée, marquée par des hauts et des bas qui reflètent l'évolution de l'industrie musicale et des habitudes de consommation.</p>
                
                <h2>Les débuts glorieux</h2>
                <p>Inventé en 1888 par Emile Berliner, le disque vinyle révolutionne l'industrie musicale. Contrairement aux cylindres de cire d'Edison, le disque plat permet une production de masse et une meilleure qualité sonore.</p>
                
                <h2>L'âge d'or (1950-1980)</h2>
                <p>Les années 50 à 80 marquent l'apogée du vinyle. L'introduction du 33 tours en 1948 par Columbia Records permet d'enregistrer jusqu'à 23 minutes par face, révolutionnant le concept d'album.</p>
                
                <blockquote>
                "Le vinyle n'est pas seulement un support musical, c'est une expérience sensorielle complète." - Jack White
                </blockquote>
                
                <h2>Le déclin et la résurrection</h2>
                <p>L'arrivée du CD dans les années 80 signe le déclin du vinyle. Mais paradoxalement, à l'ère du streaming, le vinyle connaît un retour spectaculaire. En 2023, les ventes de vinyles dépassent celles des CD pour la première fois depuis 1987.</p>
                
                <h2>Pourquoi ce retour ?</h2>
                <ul>
                <li><strong>La qualité sonore :</strong> Le son analogique offre une chaleur unique</li>
                <li><strong>L'objet physique :</strong> Dans un monde dématérialisé, posséder un objet tangible reprend du sens</li>
                <li><strong>L'art de la pochette :</strong> Le format 30x30 cm permet une expression artistique incomparable</li>
                <li><strong>Le rituel d'écoute :</strong> Poser le vinyle sur la platine crée un moment privilégié</li>
                </ul>
                
                <p>Aujourd'hui, le vinyle s'adresse à tous les âges et tous les genres musicaux, des rééditions de classiques aux dernières sorties pop, confirmant que la musique analogique a encore de beaux jours devant elle.</p>
            `,
            author: "Marie Dubois",
            date: "2024-12-15",
            readTime: "8 min",
            views: 1247,
            image: "/api/placeholder/800/400",
            category: "Histoire",
            tags: ["vinyle", "histoire", "musique", "analogique", "industrie"]
        }
        // Autres articles...
    ];

    const post = blogPosts.find(p => p.id === parseInt(postId));

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Article introuvable</h1>
                    <Link href="/blog" className="text-orange-500 hover:text-orange-600">
                        ← Retour au blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-[70px]">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
                    <h1 className="font-bold text-white text-[19px]">Blog DoVinyl</h1>
                    <div className="text-white/90 text-sm">
                        <Link href="/" className="hover:text-white cursor-pointer">Accueil</Link>
                        <span className="mx-2">-</span>
                        <Link href="/blog" className="hover:text-white cursor-pointer">Blog</Link>
                        <span className="mx-2">-</span>
                        <span className="text-white/70">Article</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Back button */}
                <div className="mb-6">
                    <Link 
                        href="/blog" 
                        className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Retour au blog
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Hero Image */}
                            <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-black">
                                <div className="absolute top-6 left-6">
                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="p-8">
                                {/* Title and Meta */}
                                <header className="mb-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                                        {post.title}
                                    </h1>
                                    <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
                                    
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium">{post.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(post.date).toLocaleDateString('fr-FR', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime} de lecture</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Eye className="w-4 h-4" />
                                            <span>{post.views} vues</span>
                                        </div>
                                    </div>
                                </header>

                                {/* Social Actions */}
                                <div className="flex items-center justify-between py-4 border-y border-gray-200 mb-8">
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                                            <Heart className="w-5 h-5" />
                                            <span className="text-sm">J'aime</span>
                                        </button>
                                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="text-sm">Commenter</span>
                                        </button>
                                    </div>
                                    <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-500 transition-colors">
                                        <Share2 className="w-5 h-5" />
                                        <span className="text-sm">Partager</span>
                                    </button>
                                </div>

                                {/* Article Body */}
                                <div 
                                    className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-800 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:not-italic prose-ul:text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Tags */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <Tag className="w-5 h-5 text-orange-500" />
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Author Bio */}
                                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <User className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 mb-2">{post.author}</h3>
                                            <p className="text-gray-600 text-sm">
                                                Passionné de musique et expert en vinyles, {post.author} partage ses connaissances et découvertes avec la communauté DoVinyl. Spécialiste de l'histoire de la musique et collectionneur depuis plus de 15 ans.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Posts */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles similaires</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                                            <div className="relative h-32 bg-gradient-to-br from-gray-800 to-black">
                                                <div className="absolute top-3 left-3">
                                                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                        {relatedPost.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-sm mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>
                                                <div className="flex items-center text-xs text-gray-500 space-x-3">
                                                    <span>{new Date(relatedPost.date).toLocaleDateString('fr-FR')}</span>
                                                    <span>{relatedPost.readTime}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="space-y-6 sticky top-6">
                            {/* Table of Contents */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-800">Sommaire</h3>
                                <nav className="space-y-2 text-sm">
                                    <a href="#" className="block text-gray-600 hover:text-orange-500 transition-colors py-1">
                                        Les débuts glorieux
                                    </a>
                                    <a href="#" className="block text-gray-600 hover:text-orange-500 transition-colors py-1">
                                        L'âge d'or (1950-1980)
                                    </a>
                                    <a href="#" className="block text-gray-600 hover:text-orange-500 transition-colors py-1">
                                        Le déclin et la résurrection
                                    </a>
                                    <a href="#" className="block text-gray-600 hover:text-orange-500 transition-colors py-1">
                                        Pourquoi ce retour ?
                                    </a>
                                </nav>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                                <h3 className="font-bold text-lg mb-2">Ne manquez rien !</h3>
                                <p className="text-sm opacity-90 mb-4">Recevez nos derniers articles et découvertes musicales</p>
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

                            {/* Popular Articles */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-800">Articles populaires</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((popularPost, index) => (
                                        <Link href={`/blog/${popularPost.id}`} key={popularPost.id} className="block group">
                                            <div className="flex items-start space-x-3">
                                                <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                    {index + 1}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-sm group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">
                                                        {popularPost.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 flex items-center space-x-2">
                                                        <Eye className="w-3 h-3" />
                                                        <span>{popularPost.views} vues</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .prose blockquote {
                    border-left: 4px solid #f97316;
                    padding-left: 1rem;
                    margin: 1.5rem 0;
                    font-style: italic;
                    background: #fff7ed;
                    padding: 1rem;
                    border-radius: 0.5rem;
                }
                .prose h2 {
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    color: #1f2937;
                    font-weight: 700;
                }
                .prose ul {
                    margin: 1rem 0;
                }
                .prose li {
                    margin: 0.5rem 0;
                }
            `}</style>
        </div>
    );
};

export default BlogPost;