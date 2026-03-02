# The MODELS Laboratory Website

Welcome to the official repository for the **MODELS Laboratory** website. This project serves as a digital hub for the lab's mission, team, projects, and educational "Vignettes."

## 📂 Repository Structure

The repository is organized to support a static hosting environment (GitHub Pages) while maintaining modularity through custom lightweight systems.

| Directory | Purpose |
| :--- | :--- |
| `assets/` | Core media assets, including the high-resolution background video (`background.mp4`) and audio (`audio.mp3`) used on the landing page. |
| `backgrounds/` | Supplemental image assets for page-specific backgrounds. |
| `components/` | Reusable HTML fragments (e.g., `menu.html`). These are dynamically fetched and injected via JavaScript to ensure consistent navigation across all pages without code duplication. |
| `headshots/` | Image assets specifically for team member profiles. |
| `pages/` | The primary content pages of the site. Files like `m-page.html`, `o-page.html`, etc., correspond to the specific sections represented by the **MODELS** acronym. |
| `styles/` | CSS stylesheets, modularized by page or component (e.g., `vignette.css`, `team-page.css`) to keep the styling logic clean and focused. |
| `vignettes/` | The educational heart of the lab. This folder contains a custom "Vignette Loader" system (`viewer.html`) and subdirectories for specific modules. |

## 🛠 File Functions and Logic

- **`.html`**: Defines the semantic structure. Note that some HTML files are complete pages, while others in `/components` are partials meant to be loaded via JS.
- **`.css`**: Handles all visual styling. The site prioritizes a "premium" feel using specialized layouts, typography, and glassmorphism-inspired effects.
- **`.js`**: Orchestrates the interactive elements.
    - **Component Loading**: Uses `fetch()` to inject the navigation menu into pages.
    - **Visual Effects**: Manages the SVG masking and video/audio synchronization on the landing page.
    - **Vignette Rendering**: The `viewer.html` uses `marked.js` to render Markdown content. content is stored as JS strings (e.g., `content.js`) to ensure compatibility with local file access and specific static hosting constraints.

## 🌐 Comparison to Industry Standards

While most professional websites today utilize heavy frameworks (like React, Vue, or Next.js) or Static Site Generators (like Jekyll or Hugo), the MODELS Lab website takes a **"Vanilla-First"** approach:

1. **Lightweight Modularity**: Instead of a complex build pipeline (npm/webpack), this site uses native browser capabilities (`fetch`, ES6) to manage reusability. This results in zero build time and high performance.
2. **Hand-Crafted Interactivity**: The landing page uses advanced SVG masking techniques rather than standard component libraries, providing a bespoke user experience that is difficult to achieve with "off-the-shelf" templates.
3. **Custom Content Management**: The "Vignette" system is a unique, lightweight implementation for delivering educational content. By wrapping Markdown in JS, it bypasses common CORS issues associated with loading local `.md` files in a static environment.
4. **Maintenance**: This architecture is much more transparent than a framework-based site, allowing any developer with basic HTML/JS/CSS knowledge to contribute immediately without learning a specific library.

---
*© 2026 Ryan P. McGehee, Ph.D.*

