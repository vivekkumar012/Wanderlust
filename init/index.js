const mongoose = require('mongoose');
const initdata = require('./data');
const listing = require('../models/listing');

const mongoURL = 'mongodb+srv://i_vivek_07:vWFSIK8qkavOWGvB@cluster0.lomqe.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0';

main().then(() => {
    console.log('Connected to the Database');
}).catch((err) => {
    console.error('MongoDB Connection Error:', err);
});

async function main() {
    await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const initDb = async () => {
    try {
        await listing.deleteMany({});
        initdata.data = initdata.data.map((obj) => ({
            ...obj,
            owner: "65a7a913ac24ac23c6839a1c"
        }));
        await listing.insertMany(initdata.data);
        console.log('Data was initialized');
    } catch (error) {
        console.error('Error initializing data:', error);
    } finally {
        mongoose.connection.close(); // Close connection after seeding
    }
};

initDb();
