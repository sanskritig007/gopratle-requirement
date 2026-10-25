import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;

  try {
    if (mongoUri && mongoUri.trim() !== '') {
      console.log('🔄 Connecting to provided MongoDB URI...');
      await mongoose.connect(mongoUri);
      console.log('✅ Connected to MongoDB successfully.');
    } else {
      console.log('ℹ️ No MONGODB_URI provided in .env. Starting in-memory MongoDB for local development...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      await mongoose.connect(inMemoryUri);
      console.log(`✅ Connected to In-Memory MongoDB at: ${inMemoryUri}`);

      // Handle process exit cleanly
      process.on('SIGINT', async () => {
        await mongoose.disconnect();
        await mongod.stop();
        process.exit(0);
      });
    }
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}
