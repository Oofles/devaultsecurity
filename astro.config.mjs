import { defineConfig } from "astro/config"
import path from "node:path"
import { fileURLToPath } from "node:url"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
  site: "https://devaultsecurity.com",
  integrations: [mdx(), sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@components': path.resolve(__dirname, './src/components'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@consts': path.resolve(__dirname, './src/consts.ts'),
        '@types': path.resolve(__dirname, './src/types.ts'),
      }
    }
  }
})