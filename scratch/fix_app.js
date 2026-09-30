const fs = require('fs');
const pApp = 'C:\\Users\\Parth\\OneDrive\\Desktop\\task\\frontend\\src\\App.jsx';
let app = fs.readFileSync(pApp, 'utf8');

app = app.replace(
  '  const ProtectedUserRoute = ({ children }) => {',
  '  const ProtectedUserRoute = ({ children }) => {\n    return (localStorage.getItem("userToken") || localStorage.getItem("adminToken")) ? children : <Navigate to="/" />;\n  };\n  const _oldProtectedUserRoute = ({ children }) => {'
);

fs.writeFileSync(pApp, app);
