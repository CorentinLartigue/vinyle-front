import React from "react";
import Home from "@components/Home";
import evenementsData from "@data/evenements.json";
import postsData from "@data/posts.json";
import articlesData from "@data/articles.json";


// Page d'accueil ("/")

const Index: React.FC = () => {

    return (
        <div>
            <Home  evenements={evenementsData.evenements} posts={postsData.posts}  articles={articlesData.articles}/>
        </div>
    );
};

export default Index;

