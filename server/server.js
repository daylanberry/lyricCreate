const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const models = require('./models');
const lyric = require('./models/lyric')
const song = require('./models/song')
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lyrics', {
  useNewUrlParser: true })
  .then(() => console.log('connected to db'))


app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
