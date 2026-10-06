const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const encryptFile = (inputFile, outputFile, password) => {
  if (!password) {
    console.error("Error: Encryption password is required. Set MODEL_PASSWORD environment variable.");
    process.exit(1);
  }

  const key = crypto.createHash("sha256").update(password).digest();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile);

  output.write(iv);
  input.pipe(cipher).pipe(output);

  output.on("finish", () => {
    console.log(`Successfully encrypted ${inputFile} -> ${outputFile}`);
  });
};

// Read MODEL_PASSWORD from process.env or .env file
if (!process.env.MODEL_PASSWORD) {
  const envPath = path.join(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^MODEL_PASSWORD=(.*)$/m);
    if (match && match[1].trim()) {
      process.env.MODEL_PASSWORD = match[1].trim();
    }
  }
}

if (!process.env.MODEL_PASSWORD || !process.env.MODEL_PASSWORD.trim()) {
  console.error("Error: MODEL_PASSWORD environment variable is missing. Set MODEL_PASSWORD in your .env file or environment variables.");
  process.exit(1);
}

const password = process.env.MODEL_PASSWORD.trim();
const inputPath = process.argv[2] || path.join(__dirname, "../public/models/character.glb");
const outputPath = process.argv[3] || path.join(__dirname, "../public/models/character.enc");

if (require.main === module) {
  if (fs.existsSync(inputPath)) {
    encryptFile(inputPath, outputPath, password);
  } else {
    console.log(`Input model file not found at ${inputPath}. Provide paths via arguments: node scripts/encrypt.cjs <input.glb> <output.enc>`);
  }
}

module.exports = { encryptFile };
