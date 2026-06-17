async function run() {
  try {
    const loginRes = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'customer123'
      })
    });
    const loginData = await loginRes.json();
    if (!loginRes.ok) throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    
    const token = loginData.token;
    console.log('Logged in', token.substring(0, 10));

    const cartRes = await fetch('http://localhost:8000/api/cart', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        title: 'Test Sneaker',
        description: 'A test sneaker',
        mainImg: 'test.jpg',
        size: '9',
        quantity: 1,
        price: 1500,
        discount: 10,
        userId: loginData.user.id
      })
    });
    const cartData = await cartRes.json();
    if (!cartRes.ok) {
      console.error('Add to cart FAILED:', cartRes.status, cartData);
    } else {
      console.log('Add to cart SUCCESS:', cartData);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}
run();
