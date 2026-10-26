# Kerry Harris: portfolio site

Static site (HTML, CSS, vanilla JS) with no build step.

## Run it locally

```sh
cd ~/Kerry-Website
ruby -run -e httpd . -p 8080
```

Then open http://localhost:8080. Links use root paths (`/work.html`), so pages need to be served this way rather than opened by double-clicking.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `work.html` | All projects, with sector filter |
| `work/alfa-romeo.html` | Case study: #WinAlfaRomeoF1Merch |
| `work/peugeot.html` | Case study: Inception Concept at Outernet |
| `work/uphold.html` | Case study: Social growth & brand voice |
| `work/small-beer-co.html` | Case study: Reels & brand awareness |
| `work/freelance.html` | The Old Tigers Head, The Rake, Puzzle Tree Alpacas, BPMWallet |
| `services.html` | Services, process and FAQs |
| `about.html` | Bio, mission, experience, how I work |
| `contact.html` | Enquiry form and contact details |
| `privacy.html` | Privacy policy |
| `thank-you.html` | Shown after a successful enquiry |
| `404.html` | Page not found |

The header and footer are repeated on every page, so update all files if you change them.

## Before going live

1. **Images and video**: every grey `.ph` block is a placeholder labelled with what goes there. Put files in `assets/` and swap each one, e.g.
   ```html
   <video src="/assets/peugeot/outernet.mp4" poster="/assets/peugeot/outernet.jpg" autoplay muted loop playsinline></video>
   <img src="/assets/small-beer/flight.jpg" alt="Small Beer Co tasting flight" loading="lazy">
   ```
   Keep videos short (5–10s) and compressed (under ~3MB), with a poster image.
2. **Anything in `[square brackets]`** needs your input. Search the files for `[` to find them all.
3. **Enquiry form**: set the `action` on the form in `contact.html` to a Formspree (or similar) endpoint. Until then, submitting opens an email draft to kerryharris96@gmail.com.
4. **Testimonials**: the section on the home page is hidden. Remove `hidden` once you have real quotes.

## Hosting

Drag the folder into Netlify Drop, or deploy to Vercel or GitHub Pages. `404.html` is picked up automatically.
