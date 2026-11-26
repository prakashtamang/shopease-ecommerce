# ShopEase — React E-Commerce Store

A responsive learning project built with React, Vite, Tailwind CSS, React Router, Context API, and DummyJSON.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## API used

This project uses [DummyJSON Products API](https://dummyjson.com/docs/products).

- All products: `https://dummyjson.com/products?limit=100`
- Search: `https://dummyjson.com/products/search?q=phone`
- Categories: `https://dummyjson.com/products/categories`
- Category products: `https://dummyjson.com/products/category/smartphones`
- Product details: `https://dummyjson.com/products/1`

## Main features

- Product catalogue with responsive cards
- Product details with image gallery and quantity selector
- Category navigation
- Search, category, price and rating filters
- Sorting by featured, price, rating and title
- Cart with quantity updates and subtotal
- Wishlist
- Persistent cart, wishlist and theme using localStorage
- Dark/light mode
- Responsive navigation and mobile layout
- Loading, error, empty and not-found states
