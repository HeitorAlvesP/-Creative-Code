import mongoose  from 'mongoose';

const connectDB = async () => {
    try {
      const dbURI = 'mongodb+srv://heitor_dev:senha@clientes.xhdenmz.mongodb.net/?retryWrites=true&w=majority&appName=clientes';

      await mongoose.connect(dbURI);

      console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      process.exit(1); // Encerra o processo caso a conexão falhe
    }

};

export default connectDB;

