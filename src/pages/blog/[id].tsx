import React from 'react';
import { useRouter } from 'next/router';
import BlogPost from '@/components/BlogPost';

const BlogPostPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id || typeof id !== 'string') {
        return <div>Chargement...</div>;
    }

    return <BlogPost postId={id} />;
};

export default BlogPostPage;