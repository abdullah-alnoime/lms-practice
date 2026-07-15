import mongoose, {} from"mongoose"
export const databaseConnection = async()=>{
    const databaseUrl = process.env.MONGO_URI
    try{
        await mongoose.connect(databaseUrl,{
            maxPoolSize : Number(process.env.MAX_POOL_SIZE),
            serverSelectionTimeoutMS:Number(process.env.SERVER_TIME_OUT)
        })
        console.log("✅ DATABASE IS CONNECTED !")
    }
    catch(databaseError){
        console.log("❌ ERROR IN DATABASE : ",databaseError)
    }
}
