#!/usr/bin/env node
const fs = require('fs');
const csvjson = require('csvjson');

const csv = fs.readFileSync('./slides.csv', 'utf-8');

const slides = csvjson.toObject(csv);

slides.forEach(slide => {
  let existingExt;
  ['gif', 'png', 'jpg', 'jpeg'].some(ext => {
    const path = `./img/${slide.id}.${ext}`;
    if (fs.existsSync(path)) {
      existingExt = ext;
      return true;
    }
  });
  slide.ext = existingExt;
});

// const csvWithExt = csvjson.toCSV(slides, {
//   headers: 'key'
// });

fs.writeFileSync('./slides.json', JSON.stringify(slides));
