const mongoose=require('mongoose')

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("conneted to database sucessfully")
        })

    }catch(err){
        console.error(err)
    }
}
module.exports=connectToDB;