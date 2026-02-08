import mongoose from "mongoose";

async function dropIndex() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://amankumarofficial726_db_user:Aman%4099@cluster0.lrngceo.mongodb.net/daily-work-log?appName=Cluster0");

        const db = mongoose.connection.db;

        // List all indexes
        const indexes = await db.collection("works").listIndexes().toArray();
        console.log("Current indexes:", indexes.map(i => i.name));

        // Drop dateKey_1 index
        try {
            await db.collection("works").dropIndex("dateKey_1");
            console.log("✅ Successfully dropped index: dateKey_1");
        } catch (e) {
            console.log("Info:", e.message);
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

dropIndex();
