const fs = require('fs');
const pBlog = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\BlogDetail.jsx';
let blog = fs.readFileSync(pBlog, 'utf8');

blog = blog.replace(
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }",
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }"
);
blog = blog.replace(
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }",
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }"
);
blog = blog.replace(
  "<span>{blog.likes?.length || 0} Likes</span>",
  "<span>{blog.likes?.length || 0} Likes</span>\n          </button>\n          <div className='text-xs text-[var(--color-stone)] mt-2'>{blog.likes?.map(l => l.email.split('@')[0]).join(', ')}</div>"
);

fs.writeFileSync(pBlog, blog);

const pHome = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\Home.jsx';
let home = fs.readFileSync(pHome, 'utf8');
home = home.replace(
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }",
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }"
);
home = home.replace(
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }",
  "headers: { Authorization: `Bearer ${localStorage.getItem('userToken') || localStorage.getItem('adminToken')}` }"
);
home = home.replace(
  "<span>{blog.likes?.length || 0}</span>\n              </button>",
  "<span>{blog.likes?.length || 0}</span>\n              </button>\n              <span className='text-xs opacity-60 ml-2 hidden sm:inline'>{blog.likes?.slice(0,2).map(l => l.email?.split('@')[0]).join(', ')}{blog.likes?.length > 2 ? '...' : ''}</span>"
);

fs.writeFileSync(pHome, home);
