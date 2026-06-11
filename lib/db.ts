import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bd-cachex';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface GlobalMongoose {
  conn: any;
  promise: any;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached && cached.conn) {
    return cached.conn;
  }

  if (cached && !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then(async (mongooseInstance) => {
      // Lazy import seed function to prevent circular references with models
      try {
        const { seedDatabase } = await import('./seed');
        await seedDatabase();
      } catch (seedErr) {
        console.error('Database seeding failed:', seedErr);
      }
      return mongooseInstance;
    });
  }

  try {
    if (cached) {
      cached.conn = await cached.promise;
      return cached.conn;
    }
  } catch (e) {
    if (cached) {
      cached.promise = null;
    }
    throw e;
  }
}
