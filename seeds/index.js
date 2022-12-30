const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp1 = new Campground({
            //YOUR USER ID
            author: '636409e6963a6bc898aa02c7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: 'https://source.unsplash.com/collection/483251',
            // geometry:  { type: 'Point', coordinates: [ -117.162773, 32.71742 ] },
               geometry:  { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude,] },
            images: [
                {
                    // url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668276832/YelpCamp/dgmmosovwrnvohr1cbv8.jpg',
                    // url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668276832/YelpCamp/g0zxf7vgeqbbup5t7q0l.jpg',
                    //  url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668120825/YelpCamp/qcqifb08lcwk6a8txpyr.jpg',
                    // url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668034082/YelpCamp/zfq0xighmeitx525w3pj.jpg',
                    url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1672184518/YelpCamp/campgroundNightImg_ihxkb9.jpg',
                    // filename: 'YelpCamp/dgmmosovwrnvohr1cbv8',
                    // filename: 'YelpCamp/g0zxf7vgeqbbup5t7q0l',
                    // filename: 'YelpCamp/qcqifb08lcwk6a8txpyr',
                    // filename: 'YelpCamp/zfq0xighmeitx525w3pj',
                    filename: 'YelpCamp/campgroundNightImg_ihxkb9',
                    // _id: new ObjectId("636fe260fee4ea9733990693")
              
                },
                
                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668276890/YelpCamp/z9dusepgkgikffaj2agn.jpg',
                //     filename: 'YelpCamp/z9dusepgkgikffaj2agn',
                //     // _id: new ObjectId("636fe29bfee4ea973399069c")
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277030/YelpCamp/yedj4yxp37rd9eifeykh.jpg',
                //     filename: 'YelpCamp/yedj4yxp37rd9eifeykh',
                //     // _id: new ObjectId("636fe326fee4ea97339906af")
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277030/YelpCamp/yedj4yxp37rd9eifeykh.jpg',
                //     filename: 'YelpCamp/yedj4yxp37rd9eifeykh',
                //     // _id: new ObjectId("636fe326fee4ea97339906af")
              
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277111/YelpCamp/qxbzupb3k0n5zxsjk9cb.jpg',
                //     filename: 'YelpCamp/qxbzupb3k0n5zxsjk9cb',
                //     // _id: new ObjectId("636fe378fee4ea97339906b8")
              
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277111/YelpCamp/qxbzupb3k0n5zxsjk9cb.jpg',
                //     filename: 'YelpCamp/qxbzupb3k0n5zxsjk9cb',
                //     // _id: new ObjectId("636fe378fee4ea97339906b8")
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277169/YelpCamp/ncpszytli8jm7ipnfdr3.jpg',
                //     filename: 'YelpCamp/ncpszytli8jm7ipnfdr3',
                //     // _id: new ObjectId("636fe3b1fee4ea97339906c1")

                // },
                
                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277169/YelpCamp/ncpszytli8jm7ipnfdr3.jpg',
                //     filename: 'YelpCamp/ncpszytli8jm7ipnfdr3',
                //     //  _id: new ObjectId("636fe3b1fee4ea97339906c1")
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277346/YelpCamp/cidlin9qkgecyylgih2d.jpg',
                //     filename: 'YelpCamp/cidlin9qkgecyylgih2d',
                    
              
                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277346/YelpCamp/cidlin9qkgecyylgih2d.jpg',
                //     filename: 'YelpCamp/cidlin9qkgecyylgih2d',
                //     // _id: new ObjectId("636fe462fee4ea97339906d1")

                // },

                // {
                //     url: 'https://res.cloudinary.com/dnuxxq2ad/image/upload/v1668277409/YelpCamp/em5x9kujyiz4jgp8rpnr.jpg',
                //     filename: 'YelpCamp/em5x9kujyiz4jgp8rpnr',
                //     // _id: new ObjectId("636fe4a1fee4ea97339906da")
              
                // }

            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cupiditate, omnis eaque eum maxime explicabo iusto aperiam praesentium dolorem totam doloribus natus eos. Id minima similique suscipit incidunt vero adipisci.',
            price: price
        })
        await camp1.save();
    }
    // const c = new Campground({title: 'purple field'})
    // await c.save();
}

// 'https://unsplash.com/photos/SqE0zjaYuFI'
// 'https://unsplash.com/collections/483251'
seedDB().then(() => {
    mongoose.connection.close();
})