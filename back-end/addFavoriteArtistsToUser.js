const User = require('./models/User');
const Artist = require('./models/Artist');

async function addFavoriteArtistsToUser(userId, artistIds) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteArtists = artistIds;
    await user.save();

    return {
      success: true,
      message: 'Favorite artists added successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

module.exports = addFavoriteArtistsToUser;
