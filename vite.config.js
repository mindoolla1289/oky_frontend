import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['md-linedivider'].includes(tag),
        }
      }
    })
  ],
  optimizeDeps: {
    include: ['ckeditor5-custom-build']
  }
})