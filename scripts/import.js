const mongoose = require('mongoose');
const request = require('request');
const cheerio = require('cheerio');
const async = require('async');

const INDEX_URL = 'http://www.todotango.com/english/music/songs/scores/-/0/0/';

const createConfig = (env) => ({
  username: env.MONGODB_USERNAME,
  password: env.MONGODB_PASSWORD,
  server: env.MONGODB_SERVER,
  port: env.MONGODB_PORT,
  database: env.MONGODB_DATABASE,
});

const config = createConfig(process.env);
const mongoUri = `mongodb://${encodeURIComponent(config.username)}:${encodeURIComponent(config.password)}@${config.server}:${config.port}/${config.database}`;

console.log(mongoUri);

mongoose.Promise = global.Promise;

mongoose.connect(mongoUri, { useMongoClient: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  const LyricsSchema = new mongoose.Schema({
    text: { type: String, default: null }
  }, { _id: false });

  const ScoresSchema = new mongoose.Schema({
    pageCount: { type: Number, default: 0 },
    pages: { type: Array, default: null }
  }, { _id: false });

  const PartituraSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: Array, default: null },
    cover: { type: String, default: null },
    source: { type: String, default: null },
    music: { type: Array, default: null },
    poetry: { type: Array, default: null },
    lyrics: { type: LyricsSchema, default: null },
    scores: { type: ScoresSchema, default: null },
  });

  const Partitura = mongoose.model('Partitura', PartituraSchema);

  const loadPage = (url) =>
    new Promise((resolve, reject) =>
      request(url, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          return reject(new Error(`Error loading page ${url}`));
        }
        console.log('Loaded page');
        resolve(body);
      })
    );

  const parseHtml = (html) =>
    cheerio.load(html, { normalizeWhiteSpace: true });

  const extractTitles = ($) => {
    console.log('Extracting titles...');
    const tags = $('div.col-xs-12 div.itemlista a');
    const links = [];

    let tag;

    for (let id in tags) {
      if (!tags.hasOwnProperty(id)) {
        continue;
      }

      tag = tags[id];

      if (tag.name !== 'a') {
        continue;
      }

      links.push({
        id: parseInt(id),
        title: tag.children[0].data,
        href: tag.attribs.href,
        localId: tag.attribs.id
      });
    }

    return links;//.slice(0, 100);
  };

  const parsePages = (links) => {
    console.log('Parsing pages...');
    return new Promise((resolve, reject) => {
      async.eachLimit(links, 3, (item, callback) => {
        loadPage(item.href)
          .then(parseHtml)
          .then(extractPageData(item.href))
          .then(saveToDatabase)
          .then(wait)
          .then(() => callback(null))
          .catch((err) => {
            console.error(err);
            callback()
          });
      }, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      })
    });
  };

  const getCover = ($) => {
    if (!$) {
      return null;
    }
    const src = $[0].attribs.src;
    return src.match('pixel.gif') ? null : src;
  };

  const extractPageData = (href) => ($) => {
    console.log('Extracting data from page...');
    const lyrics = $('div#letra span#main_Tema1_lbl_Letra').text();
    const scores = $('div#partitura div.cajita_gris2 div').children();
    const cover = $('img#main_Tema1_img_part');
    const genre = $('span#main_Tema1_lbl_Ritmo').text();
    const title = $('span#main_Tema1_lbl_Titulo').text();
    const musicAuthors = $('span#main_Tema1_Tema_Autores1_lbl_TituloAutoresMusica ~ span a');
    const lyricAuthors = $('span#main_Tema1_Tema_Autores1_lbl_TituloAutoresLetra ~ span a');

    const pages = [], composers = [], poets = [];
    let src, i, n;

    for (i = 0, n = scores.length; i < n; i++) {
      src = scores[i].attribs.src;
      if (src.match('pixel.gif') === null) {
        pages.push(src);
      }
    }

    for (i = 0; i < musicAuthors.length; i++) {
      composers.push(musicAuthors[i].children[0].data);
    }

    for (i = 0; i < lyricAuthors.length; i++) {
      poets.push(lyricAuthors[i].children[0].data);
    }

    return {
      title,
      genre: genre.length > 0 ? genre : null,
      cover: getCover(cover),
      music: composers,
      poetry: poets,
      source: href,
      lyrics: lyrics ? {
        text: lyrics.replace('<br>', '\r\n')
      } : null,
      scores: {
        pageCount: pages.length,
        pages: pages
      }
    };
  };

  const wait = () =>
    new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 5000))
    );

  const saveToDatabase = (item) => {
    console.log(`Saving ${item.title}...`);
    return new Partitura(item).save();
  };

  loadPage(INDEX_URL)
    .then(parseHtml)
    .then(extractTitles)
    .then(parsePages)
    .then(() => db.close())
    .then(() => console.info('DONE'))
    .catch(console.error);
});
