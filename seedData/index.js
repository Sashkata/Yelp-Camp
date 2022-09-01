const mongoose = require('mongoose');
const axios = require('axios');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');
//No need for options: useNewUrlParser, useCreateIndex, and useUnifiedTopology after mongoose v6

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connection established');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const place = sample(places);
    const descriptor = sample(descriptors);
    const { city, state } = sample(cities);
    const price = Math.floor(Math.random() * 20) + 10;

    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${city}, ${state}`,
      title: `${descriptor} ${place}`,
      image: await seedImg(),
      price: price,
      author: '630c016d58f6e509ffd3407a',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque est, alias maxime esse, doloremque quod necessitatibus perferendis quibusdam cumque quas ad quis praesentium a unde exercitationem eligendi odio quia adipisci.',
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

async function seedImg() {
  try {
    const resp = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: 'kFezX4g0hbIcPIu8wOQHthvQUVgHMJiwnrhklX1jTHM',
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}
