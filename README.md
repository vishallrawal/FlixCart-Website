# 🎥 FlixCart | Advanced Cinematic E-Commerce Simulator

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-FlixCart%20Active-e50914?style=for-the-badge&logo=githubpages&logoColor=white)](https://vishallrawal.github.io/FlixCart-Website/)
[![Tech Stack](https://img.shields.io/badge/Stack-Astro%20%7C%20React%20%7C%20Tailwind%20v4-3b82f6?style=for-the-badge)](https://github.com/vishallrawal/FlixCart-Website)
[![Creator](https://img.shields.io/badge/Developed%20By-Vishal%20Rawal-emerald-500?style=for-the-badge)](https://github.com/vishallrawal)

</div>

---

## 🚀 Concept & Overview
**FlixCart** is a premium, high-performance mock e-commerce web application inspired by Flipkart/Amazon shopping workflows, redesigned with a **cinematic Netflix-style visual system** and a **live client-side merchant dashboard**. 

It serves as an advanced prototype demonstrating how **Static Site Generation (SSG)** can host complex, reactive database interactions entirely client-side, eliminating server latency and maintaining exceptional performance scores.

> [!TIP]
> **Experience it Live:** [https://vishallrawal.github.io/FlixCart-Website/](https://vishallrawal.github.io/FlixCart-Website/)

---

## 💎 Key Innovations ("Production-Grade Features")

Instead of standard template grids, FlixCart features custom-engineered system interactions:

### 1. Auto-Cycling Billboard Tickers (One-by-One running)
* **Auto Running Showcase**: The homepage hero panel cycles through top trending products one-by-one every 4 seconds, featuring slide-in descriptions and fade-in transitions.
* **Dashboard Ticker**: The analytics dashboard includes a live product ticker updating every 2.5 seconds.

### 2. Client-Side Merchant Control Console (`/admin`)
* **Gross Revenue & AOV Charts**: Real-time sales calculations based on active checkout transactions.
* **Live Order Tracking Log**: Checkout operations immediately append orders to the simulator pipeline log. You can update shipping status (*Processing*, *Shipped*, *Delivered*, *Cancelled*) live.
* **Inventory Overrides**: Edit prices, configure discount tags, or toggle items to *Out of Stock* (which instantly updates product cards and disables storefront purchases).
* **Coupon Code Manager**: Add or delete promo codes (store-wide or scoped to specific categories) in real-time.

### 3. Specifications Comparison Matrix
* Add up to 3 products to a comparison list to compare technical specifications, customer reviews, category parameters, and pricing side-by-side.

### 4. Smart Discount Validation Engine
* Enter active promo codes (like `WELCOME15` for 15% off, `FESTIVE30` for 30% off Home items, `TECHGURU` for 20% off Electronics) during checkout to deduct percentages from cart totals dynamically.

### 5. Multi-Color Branding System
* A color palette combining **yellow, red, green, pink, and light blue** across active slide dots, category tags, countdown numbers, and navbar icons.

### 6. Zero-Dependency Offline Graphics
* Pre-encoded inline vector shapes ensure visual reliability, resolving broken image errors instantly if networks fail.

---

## 🏛️ System Architecture

FlixCart employs modern frontend rendering and synchronization patterns:

* **Micro-Island Synchronization**: Astro renders pages as static HTML. To preserve dynamic state (shopping cart counts, active coupons, specification matrix) across pages without a heavy monolithic SPA framework, we implemented a custom DOM event bus (`ecommerce-cart-update`, `ecommerce-compare-update`). React islands listen to this window bus to dynamically mutate local states instantly.
* **Reactive Client-Side Database**: Product data is resolved in the browser by merging a static catalog with custom overrides stored in `localStorage`. Changes made via the Merchant Control Panel automatically dispatch event updates, causing all storefront components to hydratively update.

---

## 🛠️ Technology Stack
* **Framework**: Astro (Static pre-generation)
* **Component Engine**: React.js
* **Styling**: Tailwind CSS v4 (with neon drop shadows & transition curves)
* **Icons**: Lucide Icons
* **State Store**: Decoupled Event Bus + LocalStorage persistence
* **CI/CD Pipeline**: GitHub Actions

---

## ⚙️ How to Run Locally

### 1. Clone the Project
```bash
git clone https://github.com/vishallrawal/FlixCart-Website.git
cd FlixCart-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open **`http://localhost:4321`** in your browser.

### 4. Build for Production
```bash
npm run build
```
This generates static pre-rendered routes inside the `dist/` directory.

---

## 🧑‍💻 Creator & Developer
* **Name**: Vishal Rawal
* **GitHub**: [@vishallrawal](https://github.com/vishallrawal)
* **Project Repository**: [FlixCart-Website](https://github.com/vishallrawal/FlixCart-Website)
