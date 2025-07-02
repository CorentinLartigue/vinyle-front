import React, { useEffect } from "react";
import Profil from "@components/Profil";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Index: React.FC = () => {
    const { user: profile } = useAuth();
    const router = useRouter();

   /* useEffect(() => {
        if (profile === null) {
            router.replace("/login");
        }
    }, [profile, router]);

    if (profile === null) return null; // ou un loader
*/
    return (
        <div>
            <Profil/>
        </div>
    );
};

export default Index;

