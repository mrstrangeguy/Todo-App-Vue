import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(faPhone);

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
