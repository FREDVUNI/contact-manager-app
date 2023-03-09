import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const dbOptions: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(process.env.MONGO_URI!, dbOptions);

    console.log('database connected!');
  } catch (err) {
    console.error((err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
