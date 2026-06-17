const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');
const Admin = require('./models/Admin');

const seedData = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected for seeding...');
    }

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Admin.deleteMany({});

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      username: 'Admin',
      email: 'admin@shopez.com',
      password: hashedPassword,
      usertype: 'admin'
    });

    // Create test customer
    const customerPassword = await bcrypt.hash('customer123', salt);
    await User.create({
      username: 'John Doe',
      email: 'john@example.com',
      password: customerPassword,
      usertype: 'customer'
    });

    console.log('Users seeded');

    // Create admin config
    await Admin.create({
      banner: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop',
      categories: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports']
    });

    console.log('Admin config seeded');

    // Seed products
    const products = [];
    const adjectives = [
      'Premium', 'Classic', 'Modern', 'Elegant', 'Ultra', 'Smart', 'Luxury', 'Essential', 'Vintage', 'Trendy', 
      'Stylish', 'Advanced', 'Authentic', 'Pro', 'Minimalist', 'Eco', 'Superior', 'Rugged', 'Refined', 'Chic',
      'Exclusive', 'Urban', 'Performance', 'Formal', 'Cozy', 'Active', 'Smart', 'Elite', 'Breeze', 'Zen'
    ];
    const nouns = {
      'Electronics': ['Smartphone', 'Laptop', 'Headphones', 'Smartwatch', 'Camera', 'Tablet', 'Speaker', 'Monitor', 'Keyboard', 'Drone'],
      'Fashion': ['T-Shirt', 'Jeans', 'Jacket', 'Dress', 'Sneakers', 'Handbag', 'Watch', 'Sunglasses', 'Belt', 'Scarf'],
      'Home': ['Lamp', 'Chair', 'Table', 'Vase', 'Cushion', 'Rug', 'Clock', 'Planter', 'Mirror', 'Kitchen Set'],
      'Beauty': ['Lipstick', 'Foundation', 'Perfume', 'Face Cream', 'Mascara', 'Serum', 'Shampoo', 'Palette', 'Lotion', 'Brush Set'],
      'Sports': ['Yoga Mat', 'Dumbbells', 'Football', 'Running Shoes', 'Racket', 'Jersey', 'Water Bottle', 'Gym Bag', 'Bicycle', 'Goggles']
    };
    const images = [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576566582402-2d9396096a60?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1520639889313-7272a74744ae?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec17ba36b5bc?w=500&h=500&fit=crop'
    ];

    const categoryImages = {
      'Electronics': [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop', // Smartphone
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop', // Laptop
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', // Headphones
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', // Smartwatch
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop', // Monitor
        'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop', // Tablet
        'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop', // Camera
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=500&fit=crop', // Speaker
        'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=500&h=500&fit=crop', // Keyboard
        'https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?w=500&h=500&fit=crop'  // Drone
      ],
      'Fashion': [
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=500&fit=crop', // T-Shirt
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop', // Jeans
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop', // Jacket
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop', // Dress
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop', // Sneakers
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', // Bag
        'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&h=500&fit=crop', // Watch
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop', // Sunglasses
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=500&fit=crop', // Leggings
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop'  // Shirt
      ],
      'Home': [
        'https://images.unsplash.com/photo-1524758631624-e28a90302097?w=500&h=500&fit=crop', // Chair
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&h=500&fit=crop', // Table
        'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?w=500&h=500&fit=crop', // Clock
        'https://images.unsplash.com/photo-1484101403633-562f65bd242a?w=500&h=500&fit=crop', // Cushion
        'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&h=500&fit=crop', // Planter
        'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&h=500&fit=crop', // Lamp
        'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500&h=500&fit=crop', // Vase
        'https://images.unsplash.com/photo-1520004481444-d50fe0a9d073?w=500&h=500&fit=crop', // Rug
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=500&fit=crop', // Mirror
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&h=500&fit=crop'  // Decor
      ],
      'Beauty': [
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop', // Lipstick
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop', // Perfume
        'https://images.unsplash.com/photo-1596462502278-27bfad40238d?w=500&h=500&fit=crop', // Skincare
        'https://images.unsplash.com/photo-1515688598190-82927888ff9c?w=500&h=500&fit=crop', // Serum
        'https://images.unsplash.com/photo-1526045431048-f857369aba09?w=500&h=500&fit=crop', // Foundation
        'https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?w=500&h=500&fit=crop', // Mascara
        'https://images.unsplash.com/photo-1535585209827-a15fefbc7688?w=500&h=500&fit=crop', // Shampoo
        'https://images.unsplash.com/photo-1519735878-18e404394982?w=500&h=500&fit=crop', // Lotion
        'https://images.unsplash.com/photo-1515234558231-1554559b3ae3?w=500&h=500&fit=crop', // Palette
        'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop'  // Brush
      ],
      'Sports': [
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop', // Gym
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop', // Yoga
        'https://images.unsplash.com/photo-1517466787929-bc94db4066c0?w=500&h=500&fit=crop', // Football
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', // Running Shoes
        'https://images.unsplash.com/photo-1617082067338-42880df9a28c?w=500&h=500&fit=crop', // Racket
        'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?w=500&h=500&fit=crop', // Jersey
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop', // Water Bottle
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', // Gym Bag
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop', // Bicycle
        'https://images.unsplash.com/photo-1628150493635-f76156e54256?w=500&h=500&fit=crop'  // Goggles
      ]
    };

    const allCategories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
    const productsPerCategory = 10;
    const usedTitles = new Set();

    for (const category of allCategories) {
      const nounList = nouns[category];
      const imgPool = categoryImages[category];
      for (let i = 0; i < productsPerCategory; i++) {
        let title = '';
        let attempts = 0;
        do {
          const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
          const noun = nounList[Math.floor(Math.random() * nounList.length)];
          title = `${adjective} ${noun}`;
          if (attempts > 5) title = `${adjective} ${noun} ${usedTitles.size + 1}`;
          attempts++;
        } while (usedTitles.has(title.toLowerCase()));
        
        usedTitles.add(title.toLowerCase());
        const img = imgPool[i % imgPool.length]; // Ensure distribution from the pool

        products.push({
          title,
          description: `Experience the best of ${category.toLowerCase()} with our ${title.toLowerCase()}. A perfect blend of quality and functionality.`,
          mainImg: img,
          carousel: [img],
          sizes: category === 'Fashion' ? ['S', 'M', 'L', 'XL'] : category === 'Footwear' ? ['7', '8', '9', '10'] : ['One Size'],
          category,
          gender: 'Unisex',
          price: Math.floor(Math.random() * 5000) + 499,
          discount: Math.floor(Math.random() * 40)
        });
      }
    }

    await Product.insertMany(products);
    console.log(`${products.length} products seeded`);

    console.log('\n--- Seed Complete ---');
    console.log('Admin login: admin@shopez.com / admin123');
    console.log('Customer login: john@example.com / customer123');

    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Seed Error:', error.message);
    if (require.main === module) {
      process.exit(1);
    } else {
      throw error;
    }
  }
};

if (require.main === module) {
  seedData();
}

module.exports = seedData;
