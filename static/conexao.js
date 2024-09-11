import dotenv from 'dotenv'; //arquivo de segurança para n ir o link 
import mongoose  from 'mongoose';//do banco para o git 

dotenv.config(); //sei nn kkkj só sei q funciona


const connectDB = async () => { //funcção para conectar no banco de dados
    try {
      const dbURI = process.env.DATABASE_URL; //variavel que está no arquivo
                                              //.env para segurança
      await mongoose.connect(dbURI);

      console.log('Conectado ao MongoDB Atlas');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      process.exit(1); 
    }

};

export default connectDB; //expostar a função para outros arquivos

