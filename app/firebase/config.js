// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Auth configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inventory configuration
const firebaseConfiguration = {
    apiKey: "AIzaSyBl0VK67Mumf17QzoJIIZ_GMyDK5jGMo6Q",
    authDomain: "inventory-management-e694c.firebaseapp.com",
    projectId: "inventory-management-e694c",
    storageBucket: "inventory-management-e694c.appspot.com",
    messagingSenderId: "474925511935",
    appId: "1:474925511935:web:7cf35de0948e723c0b48ca",
};

// Initialize the main app
const app = !getApps().find(app => app.name === 'main')
    ? initializeApp(firebaseConfig, 'main')
    : getApp('main');

// Initialize the inventory app
const inventoryApp = !getApps().find(app => app.name === 'inventory')
    ? initializeApp(firebaseConfiguration, 'inventory')
    : getApp('inventory');

// Export the main app's services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the inventory app's services
const inventoryAuth = getAuth(inventoryApp);
const inventoryDb = getFirestore(inventoryApp);

export { app, auth, db, inventoryApp, inventoryAuth, inventoryDb };
