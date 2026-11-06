# Pune.CarRentals — Website

A React + Tailwind self-drive car rental site. No sign-in/sign-up — every
"Book Now" button opens a form (name, phone, rental duration) that requires
confirming a valid Driving License and Aadhaar Card, then sends the details
straight to WhatsApp so the owner can take it from there.

## Run it locally

You'll need [Node.js](https://nodejs.org) (v18 or newer) installed.

```bash
npm install
npm run dev
```

This starts a local server (usually at `http://localhost:5173`) where you
can see and test the site live as you make changes.

## Add your car photos

1. Put your photos in the `public/cars/` folder.
2. Open `src/data/fleet.js` and set the `image` field for each car, e.g.:
   ```js
   image: '/cars/thar.jpg'
   ```
   Until you do this, that car shows a clean colored icon instead — nothing
   breaks.

## Edit business details

Phone numbers, email, Instagram handle, and the WhatsApp number that
receives bookings are all in one place: `src/config.js`.

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with the finished, optimized site.

## Deploy it (free options)

**Netlify (easiest — drag and drop):**
1. Run `npm run build`.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the `dist` folder onto the page. You'll get a live URL instantly.

**Vercel (good if you'll keep updating it):**
1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Vite — just click Deploy. Every future GitHub push
   updates the live site automatically.

Both give you a free `.netlify.app` / `.vercel.app` URL, and you can attach
your own domain later from that platform's settings.

## Project structure

```
src/
  components/    All page sections (Header, Hero, Fleet, FAQ, etc.)
  data/fleet.js  Cars, prices, tags, and image paths
  config.js      Phone, email, Instagram, WhatsApp number
  App.jsx        Wires the page together
public/cars/     Put your car photos here
```
