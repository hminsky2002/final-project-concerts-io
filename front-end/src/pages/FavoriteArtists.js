import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import './FavoriteArtists.css';
import ArtistComponent from '../components/ArtistComponent';

const FavoriteArtists = (props) => {
  const jwtToken = localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(jwtToken && true);
  const [favArtists, setFavArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [errorMessage, setErrorMessage] = useState(``);

  const filterArtists = (artists, query) => {
    const filtered = artists.filter((artist) =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArtists(filtered);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/FavoriteArtists`, {
      headers: { Authorization: `JWT ${jwtToken}` },
    })
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false);
        }
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          setErrorMessage(data.message);
        } else {
          setFavArtists(data);
          filterArtists(data, searchQuery);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  useEffect(() => {
    filterArtists(favArtists, searchQuery);
  }, [searchQuery, favArtists]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // if the user is not logged in, redirect them to the login route
  if (!isLoggedIn) {
    return <Navigate to="/login?error=protected" />;
  }

  if (errorMessage) {
    return (
      <div className="FavoriteArtists">
        <h1>Your Favorite Artists</h1>
        <section>
          <p className="error">{errorMessage}</p>
        </section>
      </div>
    );
  } else {
    return (
      <div className="FavoriteArtists">
        <h1>Your Favorite Artists</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search concerts"
            value={searchQuery}
            onChange={handleInputChange}
            className="search-input"
          />
        </div>
        <section>
          {filteredArtists.map((x) => (
            <ArtistComponent key={x._id} details={x} />
          ))}
        </section>
      </div>
    );
  }
};

export default FavoriteArtists;
