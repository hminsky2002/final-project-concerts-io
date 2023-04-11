require('./db');
const express = require('express');

const path = require('path');

const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config({ silent: true });
const morgan = require('morgan');
const helpers = require('./spotifyHelperFunctions');
const ConcertRouter = require('./routes/Concert');
const TicketMasterRouter = require('./routes/TicketMaster');
const TicketMasterManyRouter = require('./routes/TicketMasterMany');

const ArtistRouter = require('./routes/Artist');

const app = express();

const SavedConcertsRoute = require('./routes/SavedConcerts');
const FavoriteArtistsRoute = require('./routes/FavoriteArtists');
const SpotifyConnectRouter = require('./routes/SpotifyConnnect');
const SpotifyCallbackRouter = require('./routes/SpotifyCallback');
const LoginRouter = require('./routes/Login');
const RegisterRouter = require('./routes/Register');
const EditProfileRouter = require('./routes/EditProfile');
const RecommendedRouter = require('./routes/Recommended');
const TicketmasterSearchRouter = require('./routes/TicketmasterSearch');
const LastFmConnectRouter = require('./routes/LastFmConnect');
const LastFmCallbackRouter = require('./routes/LastFmCallback');

// Middleware

app.use(cors());
// use the morgan middleware to log all incoming http requests
app.use(morgan('dev')); //

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use('/static', express.static('public'));

app.use(cors());
app.use('/ticketmaster', TicketMasterRouter);
app.use('/ticketmastermany', TicketMasterManyRouter);

app.use('/SavedConcerts', SavedConcertsRoute);
app.use('/FavoriteArtists', FavoriteArtistsRoute);
app.use('/spotifyconnect', SpotifyConnectRouter);
app.use('/spotifycallback', SpotifyCallbackRouter);
app.use('/ticketmastersearch', TicketmasterSearchRouter);
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);
app.use('/edit-profile', EditProfileRouter);
app.use('/concert', ConcertRouter);
app.use('/artist', ArtistRouter);
app.use('/recommended', RecommendedRouter);
app.use('/lastfmconnect', LastFmConnectRouter);
app.use('/lastfmcallback', LastFmCallbackRouter);

module.exports = app;
