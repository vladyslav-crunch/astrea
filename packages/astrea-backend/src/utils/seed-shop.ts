import mongoose from "mongoose";
import ShopItem from "../models/shop-item.model";
import { MONGO_URI } from "./env.ts";

const shopItems = [
  // Borders
  {
    name: "Golden Border",
    description: "A luxurious golden border that shows your prestige",
    type: "border",
    price: 500,
    color: "#FFD700",
    rarity: "legendary",
    requiredLevel: 10,
  },
  {
    name: "Ruby Border",
    description: "A fiery red border for passionate achievers",
    type: "border",
    price: 300,
    color: "#E74C3C",
    rarity: "epic",
    requiredLevel: 5,
  },
  {
    name: "Sapphire Border",
    description: "A cool blue border for calm and focused minds",
    type: "border",
    price: 300,
    color: "#3498DB",
    rarity: "epic",
    requiredLevel: 5,
  },
  {
    name: "Emerald Border",
    description: "A vibrant green border symbolizing growth",
    type: "border",
    price: 200,
    color: "#2ECC71",
    rarity: "rare",
    requiredLevel: 3,
  },
  {
    name: "Purple Border",
    description: "A mystical purple border for the wise",
    type: "border",
    price: 200,
    color: "#9B59B6",
    rarity: "rare",
    requiredLevel: 3,
  },
  {
    name: "Bronze Border",
    description: "A simple bronze border for beginners",
    type: "border",
    price: 50,
    color: "#CD7F32",
    rarity: "common",
    requiredLevel: 1,
  },
  {
    name: "Silver Border",
    description: "A sleek silver border for rising stars",
    type: "border",
    price: 100,
    color: "#C0C0C0",
    rarity: "common",
    requiredLevel: 1,
  },

  // Titles
  {
    name: "The Legendary",
    description: "For those who have achieved legendary status",
    type: "title",
    price: 1000,
    color: "#FFD700",
    rarity: "legendary",
    requiredLevel: 20,
  },
  {
    name: "Master of Tasks",
    description: "A title for the most productive achievers",
    type: "title",
    price: 400,
    color: "#E74C3C",
    rarity: "epic",
    requiredLevel: 10,
  },
  {
    name: "Goal Crusher",
    description: "For those who crush their goals with ease",
    type: "title",
    price: 400,
    color: "#9B59B6",
    rarity: "epic",
    requiredLevel: 10,
  },
  {
    name: "Rising Star",
    description: "A title for promising up-and-comers",
    type: "title",
    price: 200,
    color: "#3498DB",
    rarity: "rare",
    requiredLevel: 5,
  },
  {
    name: "Dedicated",
    description: "For those who show true dedication",
    type: "title",
    price: 200,
    color: "#2ECC71",
    rarity: "rare",
    requiredLevel: 5,
  },
  {
    name: "Beginner",
    description: "Everyone starts somewhere",
    type: "title",
    price: 50,
    color: "#95A5A6",
    rarity: "common",
    requiredLevel: 1,
  },
  {
    name: "Achiever",
    description: "For those who are making progress",
    type: "title",
    price: 100,
    color: "#34495E",
    rarity: "common",
    requiredLevel: 1,
  },
];

async function seedShop() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "astrea" });
    console.log("✅  MongoDB connected");

    // Clear existing shop items
    await ShopItem.deleteMany({});
    console.log("🗑️  Cleared existing shop items");

    // Insert new shop items
    await ShopItem.insertMany(shopItems);
    console.log(`✅  Added ${shopItems.length} shop items`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding shop:", error);
    process.exit(1);
  }
}

seedShop();
