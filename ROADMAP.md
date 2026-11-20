# Kickslam roadmap

## Done

- [x] Fresh environment (Node, Git, VS Code on D)
- [x] Vite + React + TypeScript project, pushed to GitHub
- [x] Product grid with real photos and cleaned-up data
- [x] Sale prices with strikethrough
- [x] Cart with add, remove, plus and minus

## Phase 1: Finish the storefront on local data

- [ ] Search and filters (category, brand, colour)
- [ ] Sort by price and price range filter
- [ ] Size filter (needs sizes added to the data)
- [ ] Cart saved in localStorage
- [ ] Wishlist (heart button on each card)

## Phase 2: Real pages and shared state

- [ ] React Router (shop, product details, cart, wishlist, login)
- [ ] Shared cart and wishlist state (Context or Zustand)
- [ ] Product detail page with size picker

## Phase 3: Fresh design

- [ ] Header with logo, search, cart and wishlist counters
- [ ] Hero banner and footer
- [ ] Consistent colours and fonts
- [ ] Mobile-friendly layout
- [ ] Loading and empty states

## Phase 4: Backend with Supabase

- [ ] Database: products, wishlist, cart, orders
- [ ] Import product data
- [ ] Signup, login, logout
- [ ] Cart and wishlist saved per user

## Phase 5: Checkout and orders

- [ ] Checkout page that saves an order
- [ ] Order history page
- [ ] Optional: Stripe test mode

## Phase 6: Go live (free)

- [ ] Host shoe images ourselves
- [ ] Environment variables for Supabase keys
- [ ] Deploy on Vercel, Netlify, or Cloudflare Pages
- [ ] Check current free-tier limits
- [ ] Write the README
