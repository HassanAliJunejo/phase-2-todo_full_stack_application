@echo off
echo Script to recreate the Next.js project with proper dependencies

REM Create a new Next.js project
npx create-next-app@latest temp-project --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

REM Navigate to the temp project
cd temp-project

REM Copy the package.json dependencies from the original project
echo {
  "name": "premium-todo-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/sortable": "^10.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@tailwindcss/forms": "^0.5.11",
    "@types/node": "^20.11.5",
    "@types/react": "^18.2.64",
    "@types/react-dom": "^18.2.21",
    "lucide-react": "^0.563.0",
    "next": "14.2.21",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.12.0",
    "tailwindcss": "^3.4.0",
    "vercel": "^50.12.3"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.17",
    "baseline-browser-mapping": "^2.9.19",
    "eslint": "^9.0.0",
    "eslint-config-next": "14.2.21",
    "postcss": "^8.4.33",
    "typescript": "5.9.3"
  }
} > package.json

REM Install the dependencies
npm install

REM Copy the Next.js configuration
echo module.exports = {^
  experimental: {^
    serverComponentsExternalPackages: [],^
  },^
  typescript: {^
    ignoreBuildErrors: false,^
  },^
  eslint: {^
    ignoreDuringBuilds: false,^
  },^
  swcMinify: true,^
  webpack: (config, { isServer }) => {^
    if (!isServer) {^
      config.resolve.fallback = {^
        ...config.resolve.fallback,^
        fs: false,^
      };^
    }^
    return config;^
  },^
}; > next.config.js

REM Copy the tsconfig.json
echo {
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
} > tsconfig.json

REM Build the project
npm run build