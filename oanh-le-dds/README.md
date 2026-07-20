# Oanh Le, D.D.S. — Website

A hand-built, static replacement for the Squarespace site. Plain HTML, CSS,
and a little vanilla JavaScript — no build tools, no server-side code, no
framework, no dependencies to keep updated. It costs nothing to host on
Cloudflare Pages and there's nothing here that can go out of date on its own.

## File structure

```
index.html          Home
about.html           About Dr. Le (merges the old "Our Practice" and
                      "Leading-Edge Dentistry" pages into one)
services.html         All 9 services
new-patients.html    First-visit info + accepted insurance
testimonials.html    All patient reviews
contact.html         Hours, location, map, contact form
assets/css/style.css All styling (colors, type, layout — edit here)
assets/js/main.js    Mobile menu, scroll animation, contact form handling
assets/img/          Favicon + any images you add
```

## Preview it on your machine

Because the pages use plain relative links (no server-side includes), you
can just double-click `index.html` and it'll open in your browser. That's
enough to check content and layout.

For the most accurate preview (matches how it'll behave once hosted, and
avoids a couple of minor browser quirks with `file://` pages), run a tiny
local server instead:

**If you have Python installed (Mac/Linux come with it):**
```
cd oanh-le-dds
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

**If you have Node installed:**
```
cd oanh-le-dds
npx serve
```

Either way, press Ctrl+C in the terminal to stop the server when you're done.

## Connect the contact form (required — 5 minutes)

The form on `contact.html` currently posts to a placeholder address. Until
you connect it, submissions will show an error message telling the visitor
to call or email directly instead of silently failing.

1. Go to **formspree.io** and create a free account (50 submissions/month
   free, no credit card, no backend server needed on your end).
2. Create a new form and copy the endpoint it gives you — it looks like
   `https://formspree.io/f/abcd1234`.
3. Open `contact.html`, find this line near the middle of the file:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real endpoint.
4. That's it — no other code changes needed. Formspree emails you each
   submission and also lets you view them on their dashboard.

If you'd rather not use a third-party form service at all, you can instead
change the "Send a message" button to a plain `mailto:` link — ask me and
I'll swap it in.

## Swap in real photos (recommended)

Several spots — the homepage hero, the "Meet Dr. Le" section, and the About
page — currently use a simple line-art placeholder instead of a stock photo,
since the old site's images were either generic stock photography or an
actual unused placeholder file. Whenever you have real photos of the office
or of Dr. Le:

1. Drop the image files into `assets/img/`.
2. Replace the `<svg>...</svg>` placeholder blocks with a normal
   `<img src="assets/img/your-photo.jpg" alt="...">` tag. I'm happy to do
   this for you once you have the photos — just send them over.

## Update the Yelp link

`testimonials.html` currently links to yelp.com generically. Replace that
`href` with your actual Yelp business page URL once you have it handy.

## Deploying to Cloudflare Pages (free)

1. Create a free account at **pages.cloudflare.com**.
2. Choose **"Upload assets"** (no Git required) and drag in this entire
   folder.
3. Cloudflare gives you a free `*.pages.dev` URL immediately. To use your
   own domain (e.g. oanhledds.com), add it under the project's **Custom
   Domains** tab and follow the DNS instructions Cloudflare shows you.
4. Any time you edit a file, just re-upload the folder (or connect a GitHub
   repo instead, if you'd like automatic deploys on every save).

## Why this approach

- **No backend, no server code** — everything is static files, so there's
  nothing to patch, nothing that can be hacked at the server level, and
  nothing that will "break" from a dependency going out of date.
- **No CMS or build step** — content lives directly in the HTML, so there's
  no admin panel to secure, no plugin updates, no version upgrades.
- **Fast** — no database calls, no bloated JS frameworks. Pages load
  instantly.
- **Cheap** — Cloudflare Pages' free tier comfortably covers a small
  business site like this one. Formspree's free tier covers the contact
  form. Total hosting cost: $0/month (plus whatever you pay for the domain
  name itself, same as before).

## Making future edits

Everything is plain HTML — open any `.html` file in a text editor (VS Code,
Sublime, even TextEdit/Notepad) and change the text between the tags
directly. Colors, fonts, and spacing all live in `assets/css/style.css` at
the top of the file under `:root` if you want to adjust the palette.
