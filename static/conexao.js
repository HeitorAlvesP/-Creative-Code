import dotenv from 'dotenv';
import mongoose  from 'mongoose';

dotenv.config();


const connectDB = async () => {
    try {
      const dbURI = process.env.DATABASE_URL;

      await mongoose.connect(dbURI);

      console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      process.exit(1); 
    }

};

export default connectDB;

