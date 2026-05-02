import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: "/index.html",
  },

  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        seller: "seller.html",
        creator: "creator.html",
        faq: "faq.html",
        contact: "contact.html",
      },
    },
  },
});