const fs = require('fs');
const p = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\pages\\Home.jsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace('className="text-xl md:text-3xl', 'className="text-2xl md:text-3xl');
c = c.replace('className="text-sm font-medium', 'className="text-sm font-medium mt-1"');

fs.writeFileSync(p, c);
