const mongoose = require('mongoose');

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    try {
        console.log(process.env.DB)
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("connected to database successfully")
    } catch (error) {
        console.log("could not connect to database")
    }
}