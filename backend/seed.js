import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./src/config/db.js";
import User from "./src/models/User.js";
import Store from "./src/models/Store.js";
import Rating from "./src/models/Rating.js";

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    console.log("==================================================");
    console.log("   STORERATE DATABASE SEEDING SCRIPT");
    console.log("==================================================\n");

    // 1. Connect to MongoDB using existing connection config
    await connectDB();

    // 2. Clear existing demo data
    console.log("\n1. Clearing existing data...");
    await Rating.deleteMany({});
    await Store.deleteMany({});
    await User.deleteMany({});
    console.log("   Old data cleared successfully.");

    // 3. Hash passwords with bcrypt (10 rounds matching existing authController)
    console.log("\n2. Hashing passwords...");
    const adminPasswordHash = await bcrypt.hash("Admin123!", 10);
    const ownerPasswordHash = await bcrypt.hash("Owner123!", 10);
    const userPasswordHash = await bcrypt.hash("User123!", 10);

    // 4. Create Administrator (1 user)
    console.log("\n3. Creating Administrator user...");
    const adminUser = await User.create({
      name: "StoreRate System Administrator",
      email: "admin@storerate.com",
      password: adminPasswordHash,
      address: "Admin Office, Pune, Maharashtra",
      role: "admin",
    });
    console.log(`   Admin created: ${adminUser.email}`);

    // 5. Create Store Owners (6 users)
    console.log("\n4. Creating Store Owners...");
    const ownerData = [
      {
        name: "Store Owner One Demo Account",
        email: "owner1@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 101, High Street, Baner, Pune, Maharashtra",
        role: "owner",
      },
      {
        name: "Store Owner Two Demo Account",
        email: "owner2@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 204, Datta Mandir Road, Wakad, Pune, Maharashtra",
        role: "owner",
      },
      {
        name: "Store Owner Three Demo Account",
        email: "owner3@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 12, Paud Road, Kothrud, Pune, Maharashtra",
        role: "owner",
      },
      {
        name: "Store Owner Four Demo Account",
        email: "owner4@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 5, Phoenix Road, Viman Nagar, Pune, Maharashtra",
        role: "owner",
      },
      {
        name: "Store Owner Five Demo Account",
        email: "owner5@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 18, Magarpatta Road, Hadapsar, Pune, Maharashtra",
        role: "owner",
      },
      {
        name: "Store Owner Six Demo Account",
        email: "owner6@storerate.com",
        password: ownerPasswordHash,
        address: "Shop 8, ITI Road, Aundh, Pune, Maharashtra",
        role: "owner",
      },
    ];

    const createdOwners = await User.insertMany(ownerData);
    console.log(`   Created ${createdOwners.length} store owners.`);

    // 6. Create Normal Users (10 users)
    console.log("\n5. Creating Normal Users...");
    const normalUserData = [
      {
        name: "Normal User One Demo Account",
        email: "user1@storerate.com",
        password: userPasswordHash,
        address: "Flat 101, Green Acres, Baner, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Two Demo Account",
        email: "user2@storerate.com",
        password: userPasswordHash,
        address: "Flat 202, Silver Oak, Wakad, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Three Demo Account",
        email: "user3@storerate.com",
        password: userPasswordHash,
        address: "Flat 303, Sunrise Towers, Kothrud, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Four Demo Account",
        email: "user4@storerate.com",
        password: userPasswordHash,
        address: "Flat 404, Maple Woods, Viman Nagar, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Five Demo Account",
        email: "user5@storerate.com",
        password: userPasswordHash,
        address: "Flat 505, Palm Grove, Hadapsar, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Six Demo Account",
        email: "user6@storerate.com",
        password: userPasswordHash,
        address: "Flat 606, Blue Ridge, Hinjewadi, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Seven Demo Account",
        email: "user7@storerate.com",
        password: userPasswordHash,
        address: "Flat 707, City Vista, Kharadi, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Eight Demo Account",
        email: "user8@storerate.com",
        password: userPasswordHash,
        address: "Flat 808, Sky Lounge, Kalyani Nagar, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Nine Demo Account",
        email: "user9@storerate.com",
        password: userPasswordHash,
        address: "Flat 909, Golden Palms, Pimple Saudagar, Pune, Maharashtra",
        role: "user",
      },
      {
        name: "Normal User Ten Demo Account",
        email: "user10@storerate.com",
        password: userPasswordHash,
        address: "Flat 1001, Royal Court, Aundh, Pune, Maharashtra",
        role: "user",
      },
    ];

    const createdUsers = await User.insertMany(normalUserData);
    console.log(`   Created ${createdUsers.length} normal users.`);

    // 7. Create Stores (6 stores, referencing created owners)
    console.log("\n6. Creating Stores...");
    const storeData = [
      {
        name: "Pune Tech Hub",
        email: "punetechhub@storerate.com",
        address: "Baner Road, Pune, Maharashtra",
        owner: createdOwners[0]._id,
      },
      {
        name: "Maharashtra Grocery Center",
        email: "maharashtragrocery@storerate.com",
        address: "Wakad, Pune, Maharashtra",
        owner: createdOwners[1]._id,
      },
      {
        name: "City Electronics Store",
        email: "cityelectronics@storerate.com",
        address: "Kothrud, Pune, Maharashtra",
        owner: createdOwners[2]._id,
      },
      {
        name: "Fresh Food Market",
        email: "freshfoodmarket@storerate.com",
        address: "Viman Nagar, Pune, Maharashtra",
        owner: createdOwners[3]._id,
      },
      {
        name: "Fashion Point Pune",
        email: "fashionpoint@storerate.com",
        address: "Hadapsar, Pune, Maharashtra",
        owner: createdOwners[4]._id,
      },
      {
        name: "Home Needs Store",
        email: "homeneds@storerate.com",
        address: "Aundh, Pune, Maharashtra",
        owner: createdOwners[5]._id,
      },
    ];

    const createdStores = await Store.insertMany(storeData);
    console.log(`   Created ${createdStores.length} stores.`);

    // 8. Create Ratings (36 unique user+store ratings)
    console.log("\n7. Creating Ratings...");
    // Map: [userIndex, storeIndex, ratingValue]
    const ratingMatrix = [
      // user1 (createdUsers[0])
      [0, 0, 5],
      [0, 1, 4],
      [0, 2, 5],
      [0, 4, 4],
      // user2 (createdUsers[1])
      [1, 0, 4],
      [1, 1, 5],
      [1, 3, 3],
      [1, 5, 4],
      // user3 (createdUsers[2])
      [2, 1, 4],
      [2, 2, 4],
      [2, 3, 5],
      [2, 4, 3],
      // user4 (createdUsers[3])
      [3, 0, 5],
      [3, 2, 3],
      [3, 4, 5],
      [3, 5, 5],
      // user5 (createdUsers[4])
      [4, 1, 5],
      [4, 3, 4],
      [4, 4, 4],
      [4, 5, 4],
      // user6 (createdUsers[5])
      [5, 0, 4],
      [5, 2, 5],
      [5, 3, 4],
      [5, 5, 3],
      // user7 (createdUsers[6])
      [6, 0, 5],
      [6, 1, 3],
      [6, 2, 4],
      // user8 (createdUsers[7])
      [7, 1, 4],
      [7, 3, 5],
      [7, 4, 4],
      // user9 (createdUsers[8])
      [8, 0, 4],
      [8, 4, 5],
      [8, 5, 4],
      // user10 (createdUsers[9])
      [9, 2, 5],
      [9, 3, 4],
      [9, 5, 5],
    ];

    const ratingsToInsert = ratingMatrix.map(([userIdx, storeIdx, ratingVal]) => ({
      user: createdUsers[userIdx]._id,
      store: createdStores[storeIdx]._id,
      rating: ratingVal,
    }));

    const createdRatings = await Rating.insertMany(ratingsToInsert);
    console.log(`   Created ${createdRatings.length} ratings.`);

    // 9. Validation & Verification checks
    console.log("\n8. Verifying Seed Data & Relationships...");
    const totalUsersCount = await User.countDocuments();
    const adminCount = await User.countDocuments({ role: "admin" });
    const ownerCount = await User.countDocuments({ role: "owner" });
    const normalUserCount = await User.countDocuments({ role: "user" });
    const totalStoresCount = await Store.countDocuments();
    const totalRatingsCount = await Rating.countDocuments();

    console.log(`   Total Users: ${totalUsersCount} (Admin: ${adminCount}, Owners: ${ownerCount}, Users: ${normalUserCount})`);
    console.log(`   Total Stores: ${totalStoresCount}`);
    console.log(`   Total Ratings: ${totalRatingsCount}`);

    // Verify all stores have valid owners
    for (const store of createdStores) {
      const ownerExists = await User.exists({ _id: store.owner, role: "owner" });
      if (!ownerExists) {
        throw new Error(`Store "${store.name}" references non-existent owner!`);
      }
    }
    console.log("   Verified: Every store has a valid owner.");

    // Verify all ratings have valid users and stores, and only role 'user'
    for (const r of createdRatings) {
      const user = await User.findById(r.user);
      if (!user || user.role !== "user") {
        throw new Error(`Rating references invalid user role: ${user?.role}`);
      }
      const storeExists = await Store.exists({ _id: r.store });
      if (!storeExists) {
        throw new Error(`Rating references non-existent store!`);
      }
    }
    console.log("   Verified: Every rating belongs to an active normal user and store.");

    // Compute & display average rating per store
    console.log("\n   Store Average Ratings:");
    for (let i = 0; i < createdStores.length; i++) {
      const store = createdStores[i];
      const storeRatings = await Rating.find({ store: store._id });
      const avg =
        storeRatings.reduce((sum, item) => sum + item.rating, 0) / storeRatings.length;
      console.log(`   - ${store.name}: ${avg.toFixed(2)} / 5 (${storeRatings.length} reviews)`);
    }

    // 10. Print Demo Login Credentials
    console.log("\n==================================================");
    console.log("   DEMO LOGIN CREDENTIALS");
    console.log("==================================================");
    console.log("\n[ADMINISTRATOR]");
    console.log("  Email:    admin@storerate.com");
    console.log("  Password: Admin123!");
    console.log("  Role:     admin");

    console.log("\n[STORE OWNERS] (Password for all: Owner123!)");
    createdOwners.forEach((owner, idx) => {
      console.log(`  ${idx + 1}. Email: ${owner.email} | Store: ${createdStores[idx].name}`);
    });

    console.log("\n[NORMAL USERS] (Password for all: User123!)");
    createdUsers.forEach((usr, idx) => {
      console.log(`  ${idx + 1}. Email: ${usr.email}`);
    });
    console.log("==================================================\n");

    console.log("Seed completed successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed script failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedDatabase();
