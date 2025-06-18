import { model, Schema } from "mongoose";


const economySchema = new Schema({
   userID: {type: String, required: true, unique: true},
   balance: {type: Number, default: 0}
});


export default model('economySchema', economySchema);
