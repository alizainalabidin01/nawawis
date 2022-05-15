import mongoose from "mongoose";

const connection = {}

async function dbConnect() {
    if(connection.isConnected){
        return;
    }
    const db = await mongoose.connect("mongodb+srv://zayn:Sharinggan@zayn.j1lli.mongodb.net/nawawis?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        connection.isConnected = db.Connection[0].readyState;
        console.log(connection.isConnected);
}

export default dbConnect