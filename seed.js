require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        return Product.insertMany([
            {
                "_id": "b001",
                "name": "Gold Beaded Bracelet",
                "image": "/assets/images/bracelet.jpg",
                "price": 18499,
                "oldPrice": 20999,
                "rating": 4.5,
                "reviews": 26,
                "badge": "Best Seller",
                "stock": 3,
                "description": "Delicate beads strung together to create an elegant wrist bracelet.",
                "details": [
                    "Metal: 22KT Gold",
                    "Weight: 3.1 g",
                    "Clasp: Lobster"
                ]
            },
            {
                "_id": "b002",
                "name": "Silver Charm Bracelet",
                "image": "/assets/images/bracelet2.jpg",
                "price": 4499,
                "oldPrice": 5499,
                "rating": 4.1,
                "reviews": 17,
                "badge": "Top Pick",
                "stock": 4,
                "description": "Trendy charm bracelet with dangling elements, perfect for casual outings.",
                "details": [
                    "Material: 92.5 Silver",
                    "Adjustable: Yes",
                    "Finish: Glossy"
                ]
            },
            {
                "_id": "r001",
                "name": "Classic Gold Ring",
                "image": "/assets/images/rings.jpg",
                "price": 15999,
                "oldPrice": 17999,
                "rating": 4.4,
                "reviews": 31,
                "badge": "Elegant",
                "stock": 6,
                "description": "A timeless 22KT gold ring with a sleek finish, perfect for everyday elegance.",
                "details": [
                    "Metal: 22KT Gold",
                    "Weight: 3.2 g",
                    "Warranty: 1 Year"
                ]
            },
            {
                "_id": "r002",
                "name": "Diamond Studded Ring",
                "image": "/assets/images/ring2.jpg",
                "price": 39999,
                "oldPrice": 45999,
                "rating": 4.6,
                "reviews": 18,
                "badge": "New Arrival",
                "stock": 4,
                "description": "Shine with this delicate diamond-studded gold ring for special occasions.",
                "details": [
                    "Metal: 18KT Gold",
                    "Diamond Clarity: SI1",
                    "Weight: 2.8 g"
                ]
            },
            {
                "_id": "e001",
                "name": "Elegant Earrings",
                "image": "/assets/images/earrings.jpg",
                "price": 89999,
                "oldPrice": 94999,
                "rating": 4.7,
                "reviews": 42,
                "badge": "Luxury Pick",
                "stock": 2,
                "description": "These stunning earrings are crafted with brilliance and elegance.",
                "details": [
                    "Metal: 18KT Gold",
                    "Diamond Clarity: SI2",
                    "Gross Weight: 4.25 g"
                ]
            },
            {
                "_id": "e002",
                "name": "Floral Gold Studs",
                "image": "/assets/images/earring2.jpg",
                "price": 22499,
                "oldPrice": 26999,
                "rating": 4.4,
                "reviews": 29,
                "badge": "Trending",
                "stock": 6,
                "description": "Petal-shaped gold studs inspired by nature and crafted with care.",
                "details": [
                    "Metal: 22KT Gold",
                    "Weight: 2.5 g",
                    "Finish: Glossy"
                ]
            },
            {
                "_id": "p001",
                "name": "Heart Shaped Pendant",
                "image": "/assets/images/pendants.jpg",
                "price": 12999,
                "oldPrice": 15999,
                "rating": 4.5,
                "reviews": 33,
                "badge": "Valentine Special",
                "stock": 8,
                "description": "Symbol of love, this delicate heart pendant adds charm to any outfit.",
                "details": [
                    "Metal: 18KT Rose Gold",
                    "Weight: 2.1 g",
                    "Chain Included: No"
                ]
            },
            {
                "_id": "p002",
                "name": "Om Symbol Pendant",
                "image": "/assets/images/pendant2.jpg",
                "price": 14499,
                "oldPrice": 17499,
                "rating": 4.3,
                "reviews": 25,
                "badge": "Spiritual Choice",
                "stock": 7,
                "description": "Spiritual and stylish – wear the power of Om close to your heart.",
                "details": [
                    "Metal: 22KT Gold",
                    "Weight: 2.3 g",
                    "Finish: Matte"
                ]
            },
            {
                "_id": "a001",
                "name": "Traditional Gold Anklet",
                "image": "/assets/images/anklets.jpg",
                "price": 2999,
                "oldPrice": 3499,
                "rating": 4.2,
                "reviews": 14,
                "badge": "Popular",
                "stock": 10,
                "description": "Graceful silver anklet with tiny ghungroos that jingle with every step.",
                "details": [
                    "Material: 92.5 Silver",
                    "Length: 10 inches",
                    "Weight: 8 g"
                ]
            },
            {
                "_id": "a002",
                "name": "Modern Designer Anklet",
                "image": "/assets/images/anklet2.jpg",
                "price": 3499,
                "oldPrice": 3999,
                "rating": 4.0,
                "reviews": 11,
                "badge": "Limited Stock",
                "stock": 5,
                "description": "A trendy anklet for the modern diva – lightweight and elegant.",
                "details": [
                    "Material: 92.5 Silver",
                    "Length: Adjustable",
                    "Weight: 6.5 g"
                ]
            },
            {
                "_id": "n001",
                "name": "Tiny Diamond Nosepin",
                "image": "/assets/images/nosepins.jpg",
                "price": 3299,
                "oldPrice": 3799,
                "rating": 4.3,
                "reviews": 12,
                "badge": "Daily Wear",
                "stock": 9,
                "description": "Simple and elegant gold nosepin perfect for daily wear.",
                "details": [
                    "Metal: 22KT Gold",
                    "Weight: 0.5 g",
                    "Stone: None"
                ]
            },
            {
                "_id": "n002",
                "name": "Diamond Nosepin",
                "image": "/assets/images/nosepin2.jpg",
                "price": 7999,
                "oldPrice": 8999,
                "rating": 4.6,
                "reviews": 19,
                "badge": "Sparkling Pick",
                "stock": 9,
                "description": "Sparkling diamond nosepin that adds grace to your look.",
                "details": [
                    "Metal: 18KT Gold",
                    "Diamond Weight: 0.03 ct",
                    "Clarity: SI2"
                ]
            },
            {
                "_id": "g001",
                "name": "Classic Gold Bangles",
                "image": "/assets/images/bangles.jpg",
                "price": 42999,
                "oldPrice": 49999,
                "rating": 4.7,
                "reviews": 21,
                "badge": "Ethnic Charm",
                "stock": 2,
                "description": "Pair of traditional gold bangles to complete your ethnic look.",
                "details": [
                    "Metal: 22KT Gold",
                    "Size: 2.4",
                    "Weight: 12.5 g"
                ]
            },
            {
                "_id": "g002",
                "name": "Designer Cut Bangles",
                "image": "/assets/images/bangle2.jpg",
                "price": 47499,
                "oldPrice": 51999,
                "rating": 4.5,
                "reviews": 15,
                "badge": "Exclusive",
                "stock": 3,
                "description": "Modern design bangles with intricate carvings and shine.",
                "details": [
                    "Metal: 22KT Gold",
                    "Size: 2.6",
                    "Weight: 13.2 g"
                ]
            },
            {
                "_id": "m001",
                "name": "Traditional Mangalsutra",
                "image": "/assets/images/mangalsutra.jpg",
                "price": 29999,
                "oldPrice": 34999,
                "rating": 4.8,
                "reviews": 38,
                "badge": "Wedding Special",
                "stock": 5,
                "description": "A classic black bead mangalsutra with a beautiful gold pendant.",
                "details": [
                    "Metal: 22KT Gold",
                    "Chain Length: 18 inches",
                    "Pendant: Included"
                ]
            },
            {
                "_id": "m002",
                "name": "Minimal Mangalsutra Design",
                "image": "/assets/images/mangalsutra2.jpg",
                "price": 25499,
                "oldPrice": 28999,
                "rating": 4.4,
                "reviews": 21,
                "badge": "Daily Elegance",
                "stock": 4,
                "description": "Sleek and minimal mangalsutra for daily elegance.",
                "details": [
                    "Metal: 18KT Gold",
                    "Chain Length: 16 inches",
                    "Weight: 6.8 g"
                ]
            },
            // Add more products here...
        ]);
    })
    .then(() => {
        console.log('Products inserted!');
        process.exit();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
