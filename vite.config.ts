import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

const publicRoutes = [
  '/', '/catalogue', '/realisations', '/devis-express', '/a-propos', '/contact',
  '/produits/cartes-de-visite-soft-touch', '/produits/stickers-etiquettes-vinyle',
  '/produits/tampons-cachets-trodat', '/produits/baches-et-signaletique',
  '/produits/flyers-et-depliants', '/produits/plaques-iso-et-signaletique',
  '/produits/porte-cles-plexiglas', '/produits/pulls-et-hoodies-personnalises',
];

function sitemapPlugin(): Plugin {
  return {
    name: 'gs-imprim-sitemap',
    generateBundle() {
      const baseUrl = process.env.VITE_APP_URL?.replace(/\/$/, '');
      if (!baseUrl) return;
      const urls = publicRoutes.map((route) => `<url><loc>${baseUrl}${route}</loc></url>`).join('');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemapPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
