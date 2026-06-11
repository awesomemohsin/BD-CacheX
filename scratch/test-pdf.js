const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const dataBuffer = fs.readFileSync('C:\\Users\\Mohsin\\.gemini\\antigravity-ide\\brain\\1a36b216-8dc2-44e5-b37e-c866afbffdd4\\scratch\\isp.pdf');
  const instance = new PDFParse(new Uint8Array(dataBuffer));
  
  console.log("Loading doc...");
  await instance.load();
  
  console.log("Getting text...");
  const text = await instance.getText();
  console.log("typeof text:", typeof text);
  console.log("text:", text);
}

main().catch(console.error);



