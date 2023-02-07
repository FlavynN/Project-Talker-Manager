const fs = require('fs/promises');
const path = require('path');

const talkerWrite = async (content) => {
  fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(content));
};

module.exports = talkerWrite;