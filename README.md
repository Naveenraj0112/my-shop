# My Shop

## Run locally

```sh
npm ci
npm run dev
```

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the app and deploys the `dist` directory to GitHub Pages whenever a commit is pushed to `master`.

In the repository settings, open **Settings > Pages** and set the build and deployment source to **GitHub Actions**. After the workflow completes, the site is available at `https://naveenraj0112.github.io/my-shop/`.

The Vite base path and router basename are configured for the `/my-shop/` project site. The deployment workflow also publishes a copy of the app entry point as `404.html` so product-detail routes continue to work when opened or refreshed directly.

To create a production build locally, run:

```sh
npm run build
npm run preview
```
