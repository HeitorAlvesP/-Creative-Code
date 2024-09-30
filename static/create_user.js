import mongoose from "mongoose";    

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    adm: { type: Number, default: 0 }
  });

  const User = mongoose.model('User', UserSchema); 
  export default User;