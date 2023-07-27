const mongoose = require('mongoose')


const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN );
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err)
        throw new Error('Error to connect to MongoDB')
    }
}

module.exports = {
    dbConnection
}