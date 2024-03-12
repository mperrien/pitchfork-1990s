import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://perrien.fr",
  base: "/labs/pitchfork",
  trailingSlash: "always",
  integrations: [icon({
    iconDir: "src/assets/svg"
  }), vue()]
});