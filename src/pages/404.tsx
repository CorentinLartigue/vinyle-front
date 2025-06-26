import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="container">
            <h1>404 - Page non trouvée</h1>
            <p>Oops! La page que vous recherchez n&apos;existe pas.</p>
            <p>
                <Link href="/">Retour à la page d&apos;accueil</Link>
            </p>
            <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
      `}</style>
        </div>
    );
};

export default Custom404;