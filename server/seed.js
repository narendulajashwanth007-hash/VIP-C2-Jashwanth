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

    // ─── Curated products with MATCHING images ───────────────────────────────
    const products = [

      // ── ELECTRONICS ──────────────────────────────────────────────────────────
      {
        title: 'Samsung Galaxy S24 Smartphone',
        description: 'Flagship Android smartphone with 200MP camera, Snapdragon 8 Gen 3, and 5G connectivity.',
        mainImg: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 79999,
        discount: 10
      },
      {
        title: 'Apple MacBook Pro Laptop',
        description: 'Powerful laptop featuring Apple M3 chip, 16GB RAM, and an immersive Retina display.',
        mainImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 129999,
        discount: 5
      },
      {
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise cancelling wireless headphones with 30-hour battery life.',
        mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 29999,
        discount: 15
      },
      {
        title: 'Apple Watch Series 9 Smartwatch',
        description: 'Advanced smartwatch with health monitoring, crash detection, and always-on display.',
        mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 41999,
        discount: 8
      },
      {
        title: 'Canon EOS R50 Camera',
        description: 'Mirrorless digital camera with 24.2MP APS-C sensor, perfect for photography enthusiasts.',
        mainImg: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 64999,
        discount: 12
      },
      {
        title: 'Samsung Galaxy Tab S9 Tablet',
        description: 'Premium Android tablet with 12.4-inch Dynamic AMOLED display and S Pen included.',
        mainImg: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 74999,
        discount: 10
      },
      {
        title: 'JBL Xtreme 3 Bluetooth Speaker',
        description: 'Powerful portable speaker with 15-hour playtime, waterproof and dustproof design.',
        mainImg: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 17999,
        discount: 20
      },
      {
        title: 'LG UltraWide Monitor',
        description: '27-inch 4K IPS monitor with 99% sRGB colour gamut, ideal for professionals.',
        mainImg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 34999,
        discount: 18
      },
      {
        title: 'Logitech MX Keys Keyboard',
        description: 'Advanced wireless mechanical keyboard with backlit keys and multi-device support.',
        mainImg: 'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1587829741301-dc798b83dadc?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 9999,
        discount: 10
      },
      {
        title: 'DJI Mini 4 Pro Drone',
        description: 'Lightweight foldable drone with 4K/60fps camera, obstacle avoidance, and 34-min flight time.',
        mainImg: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop'],
        sizes: ['Standard'],
        category: 'Electronics',
        gender: 'Unisex',
        price: 59999,
        discount: 5
      },

      // ── FASHION ───────────────────────────────────────────────────────────────
      {
        title: 'Classic Cotton T-Shirt',
        description: 'Premium 100% cotton round-neck tee, breathable and perfect for everyday wear.',
        mainImg: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 799,
        discount: 20
      },
      {
        title: 'Slim Fit Denim Jeans',
        description: 'Stretchable slim-fit jeans with mid-rise waist, comfortable for all-day wear.',
        mainImg: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 1999,
        discount: 25
      },
      {
        title: 'Leather Biker Jacket',
        description: 'Genuine leather biker jacket with quilted shoulders and zip detailing.',
        mainImg: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 5999,
        discount: 15
      },
      {
        title: 'Floral Wrap Dress',
        description: 'Elegant floral print wrap dress with a flattering silhouette for any occasion.',
        mainImg: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Women',
        price: 2499,
        discount: 30
      },
      {
        title: 'Nike Air Max Sneakers',
        description: 'Iconic Air Max cushioning with a breathable mesh upper for all-day comfort.',
        mainImg: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 8999,
        discount: 10
      },
      {
        title: 'Leather Tote Handbag',
        description: 'Spacious premium leather tote bag with multiple compartments and gold hardware.',
        mainImg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Women',
        price: 3499,
        discount: 20
      },
      {
        title: 'Fossil Chronograph Watch',
        description: 'Stainless steel chronograph watch with a classic dial and genuine leather strap.',
        mainImg: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 12999,
        discount: 15
      },
      {
        title: 'Polarized Aviator Sunglasses',
        description: 'UV400 polarized lenses in a classic metal aviator frame for style and eye protection.',
        mainImg: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Unisex',
        price: 1499,
        discount: 35
      },
      {
        title: 'Oxford Formal Shirt',
        description: 'Premium Oxford weave formal shirt, wrinkle-resistant with a slim-fit cut.',
        mainImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Men',
        price: 1799,
        discount: 25
      },
      {
        title: 'Woven Silk Scarf',
        description: 'Hand-woven pure silk scarf with intricate floral patterns, luxuriously soft.',
        mainImg: 'https://images.unsplash.com/photo-1589450702570-9e4e2e5c8b06?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1589450702570-9e4e2e5c8b06?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Fashion',
        gender: 'Women',
        price: 2199,
        discount: 20
      },

      // ── HOME ──────────────────────────────────────────────────────────────────
      {
        title: 'Modern Arc Floor Lamp',
        description: 'Elegant arc floor lamp with adjustable brightness and a matte black finish.',
        mainImg: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 3999,
        discount: 20
      },
      {
        title: 'Scandinavian Dining Chair',
        description: 'Minimalist solid wood dining chair with a cushioned seat for lasting comfort.',
        mainImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 5499,
        discount: 15
      },
      {
        title: 'Marble Dining Table',
        description: 'Luxury 6-seater marble-top dining table with solid metal legs.',
        mainImg: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 24999,
        discount: 10
      },
      {
        title: 'Ceramic Bud Vase Set',
        description: 'Set of 3 handcrafted matte ceramic vases in complementary earthy tones.',
        mainImg: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 1299,
        discount: 25
      },
      {
        title: 'Velvet Throw Cushion',
        description: 'Luxuriously soft velvet cushion cover with hidden zip, 45x45cm insert included.',
        mainImg: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 899,
        discount: 30
      },
      {
        title: 'Bohemian Area Rug',
        description: 'Hand-tufted 5x7ft area rug with a vibrant geometric pattern in natural fibres.',
        mainImg: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 4999,
        discount: 20
      },
      {
        title: 'Vintage Wall Clock',
        description: 'Silent sweep mechanism wall clock with a distressed wooden frame.',
        mainImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 1799,
        discount: 25
      },
      {
        title: 'Terracotta Plant Pot Set',
        description: 'Set of 4 classic terracotta planters with drainage holes, ideal for succulents.',
        mainImg: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 999,
        discount: 15
      },
      {
        title: 'Full-Length Mirror',
        description: 'Frameless full-length wall mirror with a slim border, 160x60cm.',
        mainImg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 2499,
        discount: 20
      },
      {
        title: 'Stainless Steel Kitchen Set',
        description: '8-piece stainless steel cookware set with non-stick coating and ergonomic handles.',
        mainImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop'],
        sizes: ['Small', 'Medium', 'Large'],
        category: 'Home',
        gender: 'Unisex',
        price: 7999,
        discount: 30
      },

      // ── BEAUTY ────────────────────────────────────────────────────────────────
      {
        title: 'Matte Liquid Lipstick',
        description: 'Long-lasting matte formula that delivers rich, full-coverage colour in one stroke.',
        mainImg: 'https://images.unsplash.com/photo-1586495777744-4e6232bf3fd2?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1586495777744-4e6232bf3fd2?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 799,
        discount: 20
      },
      {
        title: 'Hydrating Foundation',
        description: 'Buildable coverage foundation with SPF 30 and 24-hour hydration.',
        mainImg: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 1499,
        discount: 15
      },
      {
        title: 'Chanel No.5 Eau De Parfum',
        description: 'Iconic floral-aldehyde fragrance in a classic Chanel bottle, 50ml.',
        mainImg: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml', '100ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 8999,
        discount: 10
      },
      {
        title: 'Retinol Night Face Cream',
        description: 'Anti-ageing retinol cream that boosts collagen and reduces fine lines overnight.',
        mainImg: 'https://images.unsplash.com/photo-1596462502278-27bfad40238d?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1596462502278-27bfad40238d?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml', '100ml'],
        category: 'Beauty',
        gender: 'Unisex',
        price: 2499,
        discount: 25
      },
      {
        title: 'Volumising Mascara',
        description: 'Clump-free volumising mascara with a curved brush for defined lashes.',
        mainImg: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 999,
        discount: 20
      },
      {
        title: 'Vitamin C Brightening Serum',
        description: '15% ascorbic acid serum that fades dark spots and gives a radiant glow.',
        mainImg: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml', '100ml'],
        category: 'Beauty',
        gender: 'Unisex',
        price: 1799,
        discount: 30
      },
      {
        title: 'Argan Oil Shampoo',
        description: 'Sulphate-free shampoo enriched with Moroccan argan oil for silky, frizz-free hair.',
        mainImg: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&h=500&fit=crop'],
        sizes: ['100ml', '200ml'],
        category: 'Beauty',
        gender: 'Unisex',
        price: 699,
        discount: 15
      },
      {
        title: 'Nude Eyeshadow Palette',
        description: '18-pan highly pigmented eyeshadow palette with matte and shimmer finishes.',
        mainImg: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 2199,
        discount: 35
      },
      {
        title: 'Shea Butter Body Lotion',
        description: '48-hour moisture body lotion with shea butter and vitamin E, non-greasy formula.',
        mainImg: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop'],
        sizes: ['100ml', '200ml'],
        category: 'Beauty',
        gender: 'Unisex',
        price: 599,
        discount: 20
      },
      {
        title: 'Professional Makeup Brush Set',
        description: '12-piece vegan synthetic brush set with a stylish roll-up pouch.',
        mainImg: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop'],
        sizes: ['30ml', '50ml'],
        category: 'Beauty',
        gender: 'Women',
        price: 1299,
        discount: 25
      },

      // ── SPORTS ────────────────────────────────────────────────────────────────
      {
        title: 'Eco Yoga Mat',
        description: 'Non-slip 6mm thick eco-friendly TPE yoga mat with alignment lines.',
        mainImg: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 1799,
        discount: 20
      },
      {
        title: 'Adjustable Dumbbells Set',
        description: 'Space-saving adjustable dumbbell pair ranging from 2.5kg to 25kg per hand.',
        mainImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 4999,
        discount: 15
      },

      {
        title: 'Adidas Football',
        description: 'FIFA-approved match football with thermally bonded panels for true flight.',
        mainImg: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 2499,
        discount: 10
      },
      {
        title: 'Nike Air Zoom Running Shoes',
        description: 'Lightweight running shoes with Zoom Air cushioning and breathable Flyknit upper.',
        mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 8999,
        discount: 20
      },
      {
        title: 'Badminton Racket Pro',
        description: 'Full carbon fibre badminton racket with an isometric head for a larger sweet spot.',
        mainImg: 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 1999,
        discount: 25
      },
      {
        title: 'Sports Performance Jersey',
        description: 'Moisture-wicking polyester jersey with a mesh back panel for superior ventilation.',
        mainImg: 'https://images.unsplash.com/photo-1529526324592-fb8e4b1d5f73?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1529526324592-fb8e4b1d5f73?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 1299,
        discount: 30
      },
      {
        title: 'Insulated Sports Water Bottle',
        description: '1-litre double-wall vacuum insulated stainless steel bottle, keeps cold 24 hrs.',
        mainImg: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 899,
        discount: 15
      },
      {
        title: 'Heavy Duty Gym Bag',
        description: 'Large 40L gym duffel bag with a wet compartment, shoe pocket, and water-resistant base.',
        mainImg: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 1999,
        discount: 20
      },
      {
        title: 'Mountain Bicycle',
        description: '21-speed hardtail mountain bike with front suspension and alloy frame.',
        mainImg: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 14999,
        discount: 8
      },
      {
        title: 'Anti-Fog Swimming Goggles',
        description: 'UV protection silicone swim goggles with an adjustable strap and wide-lens view.',
        mainImg: 'https://images.unsplash.com/photo-1617574484340-1b993d6f2dbb?w=500&h=500&fit=crop',
        carousel: ['https://images.unsplash.com/photo-1617574484340-1b993d6f2dbb?w=500&h=500&fit=crop'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'Sports',
        gender: 'Unisex',
        price: 799,
        discount: 25
      },
    ];

    await Product.insertMany(products);
    console.log(`${products.length} products seeded with matching images`);

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
