import { resolve } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: '/',
//   root: 'src',
//   plugins: [react()],
//   build: {
//     outDir: resolve(__dirname, 'dist'),
//     emptyOutDir: true,
//     rollupOptions: {
//       // entry pointがあるindex.htmlのパス
//       input: {
//         '': resolve(__dirname, 'index.html'),
//       },
//       // bundle.jsを差し替え
//       output: {
//         entryFileNames: `assets/[name]/bundle.js`,
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      // entry pointがあるindex.htmlのパス
      input: {
        '': resolve(__dirname, 'index.html'),
      },
      // bundle.jsを差し替え
      output: {
        entryFileNames: `assets/[name]/bundle.js`,
      },
    },
  },
})