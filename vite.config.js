import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '5175-iy5qy1ojt81ue7s565wqc-dbf1322f.manusvm.computer',
      '5176-iy5qy1ojt81ue7s565wqc-dbf1322f.manusvm.computer',
      '5177-iy5qy1ojt81ue7s565wqc-dbf1322f.manusvm.computer',
      '5178-iy5qy1ojt81ue7s565wqc-dbf1322f.manusvm.computer',
      '5179-iwqiowootpltam090e9p1-dbf1322f.manusvm.computer',
      '5173-iwqiowootpltam090e9p1-dbf1322f.manusvm.computer',
      '5174-iwqiowootpltam090e9p1-dbf1322f.manusvm.computer',
      'localhost',
      '127.0.0.1'
    ],
    host: true
  }
})
