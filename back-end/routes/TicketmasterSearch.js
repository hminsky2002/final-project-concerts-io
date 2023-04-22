const express = require('express');

const TicketmasterSearchRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

TicketmasterSearchRouter.get(
  '/:artist',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Extract search criteria from URL parameter
      const { artist } = req.params;

      // Call the Ticketmaster API with search criteria
      const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          keyword: artist,
        },
      });

      // Filter and format API response
      console.log(response)
      let events = null
      if(response.data._embedded !== undefined){
        events = response.data._embedded.events
        if (events !== null){
          const formattedEvents = events.map((concert) => ({
          id: concert.id ?? ' ',
          name: concert.name ?? ' ',
          artist: concert.name ?? ' ',
          date: concert.dates.start.localDate ?? ' ',
          description: concert.info ?? ' ',
          location: concert._embedded.venues[0].city.name ?? ' ',
          image: concert.images !== null ? concert.images[0].url : ' ',
          ticketLink: concert.events !== null ? concert.url : ' ',
          }));
          console.log(formattedEvents)
          res.json(formattedEvents);
        }
        
      }
      else{
        res.json()
      }
       
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

module.exports = TicketmasterSearchRouter;
