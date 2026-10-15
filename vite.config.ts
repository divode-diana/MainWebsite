import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import { PAGE_PATHS, SITE_URL } from "./src/seo";

export default defineConfig({
    plugins: [
        {
            name: "canonical-pages",
            enforce: "post",
            generateBundle(_, bundle) {
                const homepage = bundle["index.html"];
                if (!homepage || homepage.type !== "asset") {
                    throw new Error("Missing homepage HTML for canonical pages");
                }
                for (const page of PAGE_PATHS.filter(page => page !== "/")) {
                    this.emitFile({
                        type: "asset",
                        fileName: `${page.slice(1)}index.html`,
                        source: String(homepage.source).replace(
                            `href="${SITE_URL}/"`,
                            `href="${SITE_URL}${page}"`,
                        ).replace(
                            `property="og:url" content="${SITE_URL}/"`,
                            `property="og:url" content="${SITE_URL}${page}"`,
                        ),
                    });
                }
                this.emitFile({
                    type: "asset",
                    fileName: "sitemap.xml",
                    source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGE_PATHS.map(page => `  <url><loc>${SITE_URL}${page}</loc></url>`).join("\n")}\n</urlset>\n`,
                });
            },
        },
        react(),
        tailwindcss(),
        svgr({ include: "**/*.svg", svgrOptions: { exportType: "named", ref: true } }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "build",
    },
});
