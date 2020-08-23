require('dotenv').config();

export default {
  secret: process.env.AUTH_SECRET,
  expirisIn: process.env.AUTH_EXPIRIS_IN,
};
