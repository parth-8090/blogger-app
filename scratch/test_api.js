const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://blogger-app-theta.vercel.app/admins/login', { email: 'admin@gmail.com', password: 'admin123' });
    console.log('Admin Success:', res.data);
  } catch(e) {
    console.log('Admin Error:', e.response?.data || e.message);
  }
  try {
    const res = await axios.post('https://blogger-app-theta.vercel.app/users/login', { email: 'user1@gmail.com', password: 'pass1' });
    console.log('User Success:', res.data);
  } catch(e) {
    console.log('User Error:', e.response?.data || e.message);
  }
}
test();
