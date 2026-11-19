# Authentic American Blog

A simple, static blog built with Eleventy. Web 1.0 inspired design, easily deployable, and free to host.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run serve
   ```

   Visit `http://localhost:8080` in your browser.

3. To build for production:
   ```bash
   npm run build
   ```

## Writing Articles

1. Create a new `.md` file in `src/articles/`
2. Add the required front matter:
   ```yaml
   ---
   layout: article.njk
   title: Your Article Title
   date: 2026-06-01
   excerpt: Optional short description
   ---
   ```
3. Write your content in Markdown

## Admin (write articles from anywhere)

Go to `https://authenticamericangoods.com/admin/` and choose **Sign In Using Access Token**.

1. Create a fine-grained GitHub token at https://github.com/settings/personal-access-tokens/new
   - Repository access: only `Roreo/authentic-american`
   - Permissions: **Contents: Read and write** (Metadata: read is added automatically)
2. Paste it into the admin login. It stays in that browser only; sign out on shared machines.

Saving an article commits a Markdown file to `src/articles/` on `main`, which triggers the deploy workflow.
Locally, `npm run serve` then `http://localhost:8080/admin/` → **Work with Local Repository** edits files on disk (Chrome/Edge).

"Sign In with GitHub" needs an OAuth helper (e.g. the sveltia-cms-auth Cloudflare Worker) and a `base_url` in `admin/config.yml`; it is not set up.

## Adding Images

1. Place images in `src/assets/images/`
2. Reference them in your articles:
   ```markdown
   ![Alt text](/assets/images/filename.jpg)
   ```

## Customization

- **Style**: Edit `src/assets/css/style.css`
- **Header/Navigation**: Edit `src/_includes/base.njk`
- **Home page**: Edit `src/index.njk`
- **Site title**: Update in `base.njk` and `package.json`

## Deployment

The blog is ready to deploy to any static hosting:

### Netlify (Recommended)
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `_site`

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Set source to `main` branch, `/root` folder
4. Configure the build command in `netlify.toml` or GitHub Actions

### Vercel
1. Import your project
2. Framework: `Other`
3. Build command: `npm run build`
4. Output directory: `_site`

### Other Options
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static file hosting

## Google Ads Integration

To add Google Ads to your site:

1. Get your AdSense code from Google
2. Add a partial template for ads in `src/_includes/` (e.g., `ads.njk`)
3. Include it in your layouts where desired:
   ```njk
   {% include "ads.njk" %}
   ```

## License

MIT
