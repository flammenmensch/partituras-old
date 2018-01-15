const Partitura = require('../models/partitura');

module.exports = {
  getRandomPartituras(limit=10) {
    return new Promise((resolve, reject) =>
      Partitura.findRandom({}, {}, { limit }, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      })
    );
  },
  getPartituraById(id) {
    return Partitura.findById(id);
  },
  searchPartituras(query) {
    if (query === '') {
      return Promise.resolve([]);
    }
    return Partitura.find({
      title: new RegExp(query, 'i')
    });
  }
};
