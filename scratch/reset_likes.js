const fs = require('fs');
const pCtrl = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\backend\\controllers\\blog.controller.js';
let cCode = fs.readFileSync(pCtrl, 'utf8');

cCode = cCode.replace(
  'const updateData = { ...req.body };',
  'const updateData = { ...req.body, likes: [], comments: [], shares: 0 };'
);

fs.writeFileSync(pCtrl, cCode);
