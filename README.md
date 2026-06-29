# 🎬 FlixCart | Premium Cinematic E-Commerce Simulator

FlixCart is an advanced, high-performance mock e-commerce web application inspired by Flipkart/Amazon shopping flows, redesigned with a **cinematic Netflix-style visual system** and a **live client-side merchant dashboard**. 

Designed and Developed by **[Vishal Rawal](https://github.com/vishalrawal)**.

---

## 🚀 Live Demo & Deployment
You can deploy this static Astro site to **Vercel** or **Netlify** for free with a single click once you push it to your GitHub repository:
- **Netlify**: Connect your GitHub repository, set Build Command to `npm run build` and Publish Directory to `dist`.
- **Vercel**: Import your repository, select **Astro** as the framework template, and click **Deploy**.

---

## 💎 Key Features ("Internship & Recruiter Ready")

Instead of a generic template, FlixCart incorporates senior-level technical patterns that simulate real production environments:

### 1. Auto-Cycling Billboard Tickers
- **Auto Running Showcase**: The homepage hero panel cycles through top trending products one-by-one every 4 seconds, showing fade-in and zoom transitions.
- **Merchant Ticker**: The analytics dashboard includes a live product ticker updating every 2.5 seconds.

### 2. Client-Side Merchant Control Console (`/admin`)
- **Gross Revenue & AOV Charts**: Real-time sales calculations based on checkout transactions.
- **Live Order Tracking Log**: Checkout operations immediately append orders to the simulator pipeline log. You can update shipping status (*Processing*, *Shipped*, *Delivered*, *Cancelled*) live.
- **Inventory Overrides**: Edit prices, configure discount tags, or toggle items to *Out of Stock* (which instantly updates product cards and disables storefront purchases).
- **Coupon Code Manager**: Add or delete promo codes (store-wide or scoped to specific categories) in real-time.

### 3. Specifications Comparison Matrix
- Add up to 3 products to a comparison list to compare technical specifications, customer reviews, category parameters, and pricing side-by-side.

### 4. Smart Discount Validation Engine
- Enter active promo codes (like `WELCOME15`) during checkout to deduct percentages from cart totals dynamically.

### 5. Multi-Color Branding System
- A color palette combining **yellow, red, green, pink, and light blue** across active slide dots, category tags, countdown numbers, and navbar icons.

### 6. Zero-Dependency Offline Graphics
- Pre-encoded inline vector shapes ensure visual reliability, resolving broken image errors instantly if networks fail.

---

## 🛠️ Technology Stack
- **Framework**: Astro (Static pre-generation)
- **Component Engine**: React.js
- **Styling**: Tailwind CSS v4 (with neon drop shadows & transition curves)
- **Icons**: Lucide Icons
- **State Store**: Decoupled Event Bus + LocalStorage persistence

---

## ⚙️ How to Run Locally

### 1. Clone the Project
```bash
git clone <your-github-repo-url>
cd E-Commerce
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

## 🏛️ Engineering & Architecture Details
For a detailed review of the system design patterns, check out [about.astro](file:///c:/E-Commerce/src/src/pages/about.astro):
- **Micro-Island Synchronization**: How isolated Astro components communicate reactively via window events.
- **Client-Side Hydration**: Dynamic overrides merging with mock databases.
