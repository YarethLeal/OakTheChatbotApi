const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../queries.json');

const loadDB = () => {
    return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
};

const saveDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { loadDB, saveDB };