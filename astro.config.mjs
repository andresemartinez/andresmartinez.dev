import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import darkPurpleTheme from "./dark-purple-theme.json" assert { type: "json" };

// https://astro.build/config
export default defineConfig({
  site: "https://andresmartinez.dev",
  markdown: {
    shikiConfig: {
      theme: darkPurpleTheme,
      wrap: true,
    },
  },
  integrations: [mdx(), sitemap(), tailwind()],
});
