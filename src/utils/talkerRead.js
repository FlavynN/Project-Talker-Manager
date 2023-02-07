const path = require('path');
const fs = require('fs/promises');

const talkerRead = async () => {
  const talkerPath = path.resolve(__dirname, '../talker.json');
  try {
    const talker = await fs.readFile(talkerPath, 'utf8');
    return JSON.parse(talker);
  } catch (error) {
    return null;
  }
};

module.exports = talkerRead;