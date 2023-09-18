const mongoose=require('mongoose')

const dbUri = process.env.DB_URI //|| "mongodb://127.0.0.1:27017/webtales"

const dbConn = async () => {
    try {

        await mongoose.connect(dbUri)
        console.log(`Successfully connected with db`)

    } catch (error) {
        console.log(`Failed to make connection with db ${error}`)
    }
}

dbConn();