"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

require('./database');

const PORT = process.env.PORT || 3333;

const app = _express2.default.call(void 0, );
app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.json());

app.use(_routes2.default);

app.listen(PORT, () => console.log('🔥 Server started at: http://localhost:3333'));
