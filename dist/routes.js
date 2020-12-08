"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserControllers = require('./app/controllers/UserControllers'); var _UserControllers2 = _interopRequireDefault(_UserControllers);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _TasksController = require('./app/controllers/TasksController'); var _TasksController2 = _interopRequireDefault(_TasksController);
var _CheckedController = require('./app/controllers/CheckedController'); var _CheckedController2 = _interopRequireDefault(_CheckedController);
var _auth = require('./middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const router = _express.Router.call(void 0, );

// Session route
router.post('/users/signin', _SessionController2.default.store);

// User route
router.post('/users/signup', _UserControllers2.default.store);
router.get('/users', _UserControllers2.default.index);

// Tasks routes
router.get('/users/:user_id/tasks', _auth2.default, _TasksController2.default.index);
router.post('/users/:user_id/tasks', _auth2.default, _TasksController2.default.store);
router.delete('/users/:user_id/tasks/:task_id', _auth2.default, _TasksController2.default.delete);

// Checked route
router.get('/users/:user_id/checktasks', _auth2.default, _CheckedController2.default.index);
router.put('/users/:user_id/tasks/:task_id', _auth2.default, _CheckedController2.default.update);

exports. default = router;
