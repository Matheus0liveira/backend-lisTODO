"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('dotenv').config();

exports. default = {
  secret: process.env.AUTH_SECRET,
  expirisIn: process.env.AUTH_EXPIRIS_IN,
};
