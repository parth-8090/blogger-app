const fs = require('fs');
const p = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\BlogDetail.jsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace('<div className="p-10">', '<div className="p-5 md:p-10">');
c = c.replace('className="text-2xl md:text-4xl', 'className="text-3xl md:text-5xl');

fs.writeFileSync(p, c);
