import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4000
  },
  plugins: [
    vue(),
    AutoImport({ 
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: false,
    }),
    Components(
      {
        dts: 'src/components.d.ts',
        dirs: ['src/components'],
        extensions: ['vue'],
        deep: true,
        exclude: ['**/node_modules/**'],
        include: ['**/*.vue'],
      }
    ),
    tailwindcss(),
  ],
})
