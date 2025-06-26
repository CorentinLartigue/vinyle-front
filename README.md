# Next.js + Tailwind CSS project with Docker

This is a [Next.js](https://nextjs.org) project containerized with Docker to ensure the same Node version, dependencies, and environment configuration for all developers.

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/CorentinLartigue/vinyle-front.git
```

Then, run the development server inside Docker using Docker Compose:

```bash

docker-compose up

```
Open http://localhost:3700 with your browser to see the result.

The project uses hot reload, so any changes you make locally will automatically update inside the container.

Production Build
To build the optimized production Docker image and run it:

```bash 

docker build -t Vinyle-front .
docker run -p 3700:3700 Vinyle-front

```

Then open http://localhost:3700 to view the production app.

