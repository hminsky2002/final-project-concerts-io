const helpers = require("./helperFunctions")
const express = require("express")
const app = express()
const path = require("path")


const multer = require("multer") 
const axios = require("axios") 
require("dotenv").config({ silent: true })
const morgan = require("morgan") 

const cors = require('cors')
const SavedConcertsRoute = require('./routes/SavedConcerts')

// Middleware

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev")) //

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// make 'public' directory publicly readable with static content
app.use("/static", express.static("public"))

app.use(cors())

app.use("/SavedConcerts", SavedConcertsRoute)

// Routes

//route for connecting spotify account
app.get('/spotifyconnect', function(req, res) {
    const state = helpers.generateRandomString(16);
  
    // requests authorization
    const scope = 'user-top-read user-library-read user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
      new URLSearchParams({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state
      }).toString());
});

// route user is redirected to after authoring spotify account
app.get('/spotifycallback', async function(req, res) {
    //application requests refresh and access tokens
    //after checking the state parameter
    const code = req.query.code || null;
    const state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        new URLSearchParams({
            error: 'state_mismatch'
        }).toString());
    } else {
        const data = await helpers.getToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET, code, process.env.REDIRECT_URI);
        const access_token = data.access_token
        const refresh_token = data.refresh_token

        //get favorite artists
        const response = await helpers.useAccessToken("https://api.spotify.com/v1/me/top/artists",access_token);
        const favArtists = response.items
        console.log(favArtists);
        res.redirect('http://localhost:3001/profile')
    }
  });





module.exports = app