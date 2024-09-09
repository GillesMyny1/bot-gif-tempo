const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');

if (fs.existsSync(envPath)) {
  console.log('.env file already exists, proceeding to start the server.');
  require('../server');
} else {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: npm start <CLIENT_ID> <CLIENT_SECRET> <REDIRECT_URI>');
    process.exit(1);
  }

  const [CLIENT_ID, CLIENT_SECRET, REDIRECT_URI] = args;
  console.log('.env file not found, creating one...');
  const envContent = `CLIENT_ID=${CLIENT_ID}\nCLIENT_SECRET=${CLIENT_SECRET}\nREDIRECT_URI=${REDIRECT_URI}\n`;

  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully.');
  require('../server');
}