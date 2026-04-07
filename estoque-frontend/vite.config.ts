import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Esse é o cara que deu erro na foto
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  base: '/projeto-estoque/',

  plugins: [
    react(),
    tailwindcss(),
  ],
})