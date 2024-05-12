import mongoose from "mongoose";
import 'dotenv/config';


const connectDB = async () => {
    // console.log(process.env.MONGODB_DATABASE, process.env.MONGODB_PASSWORD, process.env.MONGODB_USERNAME);
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.swtoktn.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
        console.log("DATABASE IS CONNECTED!");
        // mongodb+srv://jcashley4363:<password>@cluster0.swtoktn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    }).catch(error => {
        console.log(error);
    })
}
export default connectDB

