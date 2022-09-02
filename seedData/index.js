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

const imageSeeds = [
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059782/YelpCamp/photo-1469292055053-a5ebd1bfc2a6_punb4m.jpg',
    filename: 'YelpCamp/photo-1469292055053-a5ebd1bfc2a6_punb4m',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059759/YelpCamp/photo-1471474382320-7d31e2cc170e_owgzwr.jpg',
    filename: 'YelpCamp/photo-1471474382320-7d31e2cc170e_owgzwr',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059738/YelpCamp/photo-1496503662783-861c13d78261_pozrdw.jpg',
    filename: 'YelpCamp/photo-1496503662783-861c13d78261_pozrdw',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059717/YelpCamp/photo-1477512076069-d31eb021716f_gwxcnv.jpg',
    filename: 'YelpCamp/photo-1477512076069-d31eb021716f_gwxcnv',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059697/YelpCamp/photo-1488667499475-42a530fab02b_genpwr.jpg',
    filename: 'YelpCamp/photo-1488667499475-42a530fab02b_genpwr',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059676/YelpCamp/photo-1497386162420-3af67ede54e6_n1tarp.jpg',
    filename: 'YelpCamp/photo-1497386162420-3af67ede54e6_n1tarp',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059656/YelpCamp/photo-1486915309851-b0cc1f8a0084_ozuvie.jpg',
    filename: 'YelpCamp/photo-1486915309851-b0cc1f8a0084_ozuvie',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059639/YelpCamp/photo-1477512076069-d31eb021716f_yagjhl.jpg',
    filename: 'YelpCamp/photo-1477512076069-d31eb021716f_yagjhl',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059623/YelpCamp/photo-1473277728696-b5943200151d_p7htul.jpg',
    filename: 'YelpCamp/photo-1473277728696-b5943200151d_p7htul',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059608/YelpCamp/photo-1496080174650-637e3f22fa03_lhyvya.jpg',
    filename: 'YelpCamp/photo-1496080174650-637e3f22fa03_lhyvya',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059594/YelpCamp/photo-1500367215255-0e0b25b396af_adwwh3.jpg',
    filename: 'YelpCamp/photo-1500367215255-0e0b25b396af_adwwh3',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059583/YelpCamp/photo-1438016920686-9bccd253c785_zqi1bq.jpg',
    filename: 'YelpCamp/photo-1438016920686-9bccd253c785_zqi1bq',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059572/YelpCamp/photo-1438016920686-9bccd253c785_q3vt2u.jpg',
    filename: 'YelpCamp/photo-1438016920686-9bccd253c785_q3vt2u',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059563/YelpCamp/photo-1474984815137-e129646c7c9a_fjiceg.jpg',
    filename: 'YelpCamp/photo-1474984815137-e129646c7c9a_fjiceg',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059553/YelpCamp/photo-1497386162420-3af67ede54e6_hm8ol3.jpg',
    filename: 'YelpCamp/photo-1497386162420-3af67ede54e6_hm8ol3',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059546/YelpCamp/photo-1496080174650-637e3f22fa03_dxoaoe.jpg',
    filename: 'YelpCamp/photo-1496080174650-637e3f22fa03_dxoaoe',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059538/YelpCamp/photo-1457368406279-ec1ecb478381_nmrh0u.jpg',
    filename: 'YelpCamp/photo-1457368406279-ec1ecb478381_nmrh0u',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059534/YelpCamp/photo-1499542753185-ab0beddb15e9_jbv4xk.jpg',
    filename: 'YelpCamp/photo-1499542753185-ab0beddb15e9_jbv4xk',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059528/YelpCamp/photo-1444228250525-3d441b642d12_pjlado.jpg',
    filename: 'YelpCamp/photo-1444228250525-3d441b642d12_pjlado',
  },
  {
    url: 'https://res.cloudinary.com/dz7blzzja/image/upload/v1662059526/YelpCamp/photo-1488667499475-42a530fab02b_xbeu8y.jpg',
    filename: 'YelpCamp/photo-1488667499475-42a530fab02b_xbeu8y',
  },
];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const place = sample(places);
    const descriptor = sample(descriptors);
    const { city, state, latitude, longitude } = sample(cities);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      location: `${city}, ${state}`,
      title: `${descriptor} ${place}`,
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      price: price,
      author: '630c016d58f6e509ffd3407a',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque est, alias maxime esse, doloremque quod necessitatibus perferendis quibusdam cumque quas ad quis praesentium a unde exercitationem eligendi odio quia adipisci.',
      images: [
        {
          url: imageSeeds[i % 20].url,
          filename: imageSeeds[i % 20].filename,
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
