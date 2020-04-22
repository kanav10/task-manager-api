const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@` +
                         `${process.env.DB_HOST}/test?ssl=true&authSource=admin&retryWrites=true`;

// mongoose.connect('mongodb', {useNewUrlParser:true}.then(()=>{
//     console.log('connected to the db');
// }))

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: process.env.DB_NAME,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(connectionString, options).then(()=>{
        console.log('connected to db');
    }).catch((e)=>{
    console.log(`Error while attempting to connect to mongoDB`)
});

module.exports = {
    mongoose
};
