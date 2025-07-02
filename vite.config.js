import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['pdfjs-dist'],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  
        drop_debugger: true,  
        pure_funcs: ['console.info', 'console.warn'],
      },
    },
  },
})
