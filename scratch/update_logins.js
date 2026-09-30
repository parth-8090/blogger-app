const fs = require('fs');

const pAdmin = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\AdminLogin.jsx';
let aCode = fs.readFileSync(pAdmin, 'utf8');
aCode = aCode.replace(
  "localStorage.setItem('adminToken', res.data.token);",
  "localStorage.setItem('adminToken', res.data.token);\n      localStorage.setItem('adminEmail', res.data.admin.email);"
);
fs.writeFileSync(pAdmin, aCode);

const pUser = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\UserLogin.jsx';
let uCode = fs.readFileSync(pUser, 'utf8');
uCode = uCode.replace(
  "localStorage.setItem('userId', res.data.user.id);",
  "localStorage.setItem('userId', res.data.user.id);\n      localStorage.setItem('userEmail', res.data.user.email);"
);
fs.writeFileSync(pUser, uCode);
