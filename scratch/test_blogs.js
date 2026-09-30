const axios = require('axios');
async function test() {
  try {
    const res = await axios.post('https://blogger-app-theta.vercel.app/admins/login', { email: 'admin@gmail.com', password: 'admin123' });
    const token = res.data.token;
    console.log('Login Success!');
    try {
      const blogs = await axios.get('https://blogger-app-theta.vercel.app/blogs', { headers: { Authorization: `Bearer ${token}` } });
      console.log('Blogs fetched:', blogs.data.length);
    } catch (e) {
      console.log('GET /blogs Error:', e.response?.data || e.message);
    }
  } catch(e) {
    console.log('Login Error:', e.response?.data || e.message);
  }
}
test();
