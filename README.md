📋 Table of Contents

login (if needed)
Demo
Features

Tech Stack

Installation

Usage

Project Structure

Redux Store

API Integration

Screenshots

License


🔗login

username: emilys
 password: emilyspass

🎥 Demo

video :


https://drive.google.com/file/d/1C-jzRsavzMogjPZ6vp3nd5XtzNn0orKk/view?usp=drivesdk




images




![WhatsApp Image 2025-10-15 at 03 58 39_d95429aa](https://github.com/user-attachments/assets/8b651197-b065-45a6-9775-19a81cc93f32)
![WhatsApp Image 2025-10-15 at 03 58 39_370fe5ae](https://github.com/user-attachments/assets/b2d011ab-5e75-46c8-b023-d3c78260e845)


![WhatsApp Image 2025-10-15 at 03 58 39_aa1bfb07](https://github.com/user-attachments/assets/bbf5ed61-cf08-42d6-805b-02e3ed2998ce)


![WhatsApp Image 2025-10-15 at 03 58 40_6b19c15c](https://github.com/user-attachments/assets/8b6df6ce-e04e-4394-b5dc-a21dec58ff2b)


![WhatsApp Image 2025-10-15 at 03 58 40_f3ba47f2](https://github.com/user-attachments/assets/19148ba3-ad16-44f5-b872-439fbfff029d)


![WhatsApp Image 2025-10-15 at 03 58 40_cbbe43e6](https://github.com/user-attachments/assets/f8d04eb1-07d9-4085-8809-0816c42dc400)


![WhatsApp Image 2025-10-15 at 03 58 41_fdee20c0](https://github.com/user-attachments/assets/563dcaab-0238-4cc2-907c-886603e42236)



![WhatsApp Image 2025-10-15 at 03 58 41_58806a61](https://github.com/user-attachments/assets/3b42086d-c659-4bd9-946e-9b0b1cb4d07a)


✨ Features
Product Listing
Masonry layout similar to Pinterest using @react-native-seoul/masonry-list

Infinite scroll and "load more" functionality

Dynamic card heights for visually appealing layout

Product Search
Real-time product search integrated with API

Redux async actions to fetch search results

Cart Management
Add/remove products with quantity adjustment

Cart subtotal, shipping, and total calculation

Persisted cart using AsyncStorage with optional expiry

Profile Drawer
Right-side drawer navigation for profile and cart

Clicking the Profile icon opens the drawer

Themed drawer with light and dark mode support

Navigation
Combines Drawer and Stack/Tab Navigation for smooth UX

Drawer contains links to profile and cart

Stack navigation handles product listing and product details

User Authentication
Login functionality using dummy API

Token management with AsyncStorage

UI/UX
Light and dark mode themes controlled via Redux

Clean and user-friendly interface

Responsive design for all screen sizes

🛠 Tech Stack
React Native - Mobile framework

Redux Toolkit - State management

React Navigation - Stack, Drawer & Tab navigation

AsyncStorage - Local data persistence

Masonry List - @react-native-seoul/masonry-list

Expo - Development platform (optional)

DummyJSON API - Products and authentication

SVG Icons - react-native-svg

📥 Installation
Clone the repository
bash
git clone https://github.com/your-username/react-native-ecommerce.git
cd react-native-ecommerce
Install dependencies
bash
npm install
# or
yarn install
Run the project
bash
# With Expo
npx expo start

# For bare React Native - Android
npx react-native run-android

# For bare React Native - iOS
npx react-native run-ios
🚀 Usage
Product Listing
Browse products in a masonry layout

Scroll down to load more products automatically (infinite scroll)

Search
Use the search bar to find products by name

Real-time search results with API integration

Cart
Tap a product to view details or add to cart

Adjust quantity in the cart screen

Proceed to checkout (UI only, no payment integration)

Profile Drawer
Click the Profile icon to open the drawer

Access drawer to see cart and profile options

Switch between light and dark themes

Navigation
Combines Drawer and Stack Navigation for smooth UX

Intuitive navigation patterns

📁 Project Structure


<img width="201" height="991" alt="image" src="https://github.com/user-attachments/assets/3758c4ce-5d01-40b2-bb2c-ec21b34b1b6c" />

🏪 Redux Store
Slices
authSlice manages:

User token and authentication state

Products & search results

Loading state for infinite scroll

Theme toggle (light/dark)

Async Thunks
loadMoreProduct – fetch products with pagination

Search – fetch products based on search input

loginUser – handle login using dummy API

🌐 API Integration
Products
Endpoint: https://dummyjson.com/products

Supports: limit and skip for pagination

Search
Endpoint: https://dummyjson.com/products/search?q={input}

Authentication
Endpoint: https://dummyjson.com/auth/login

Storage: Token stored in AsyncStorage for session persistence

📸 Screenshots
Product Listing	Product Details	Shopping Cart
Screenshot 1	Screenshot 2	Screenshot 3
📄 License
This project is licensed under the MIT License.

Welcome to your Expo app 👋
This is an Expo project created with create-expo-app.

Get started
Install dependencies

bash
npm install
Start the app

bash
npx expo start
In the output, you'll find options to open the app in a

development build

Android emulator

iOS simulator

Expo Go, a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the app directory. This project uses file-based routing.

Get a fresh project
When you're ready, run:

bash
npm run reset-project
This command will move the starter code to the app-example directory and create a blank app directory where you can start developing.

Learn more
To learn more about developing your project with Expo, look at the following resources:

Expo documentation: Learn fundamentals, or go into advanced topics with our guides.

Learn Expo tutorial: Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
