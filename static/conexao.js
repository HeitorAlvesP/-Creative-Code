import mongoose  from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
      const dbURI = process.env.DATABASE_URL;

      await mongoose.connect(dbURI);

      console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      process.exit(1); // Encerra o processo caso a conexão falhe
    }

};

export default connectDB;

