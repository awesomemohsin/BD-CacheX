# BD-CacheX - ISP & IIG Cache Allocation System

BD-CacheX is a high-performance, modern dashboard system designed for Internet Service Providers (ISPs) and International Internet Gateways (IIGs) to manage CDN cache providers, server assets, and bandwidth allocations.

## Features

- **ISP & IIG Administration**: Comprehensive list and status tracking for all registered network provider entities.
- **Cache Provider (CDN) Tracking**: Manage integrations with Google, Akamai, Facebook, Netflix, and other major content delivery networks.
- **Server Asset Management**: Track hardware inventory, location logs, IP address routing, and capacity thresholds.
- **Bandwidth & Capacity Allocations**: Real-time capacity utilization tracking with interactive visual indicators.
- **Dynamic search filters**: Localized instant search filters over companies, servers, and allocations.
- **Modern Responsive UI**: Built with Next.js, Tailwind CSS, and Base UI components.

## Technical Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Database**: MongoDB (via Mongoose ODM)
- **State Management & Fetching**: SWR (Stale-While-Revalidate)
- **UI Components**: Base UI primitives & customized premium Tailwind components

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/bd-cachex
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```
