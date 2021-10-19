// tiny wrapper with default env vars
require('dotenv').config();

module.exports = {
    NODE_ENV: (process.env.NODE_ENV || 'development'),
    PORT: (process.env.PORT || 3000)
};
