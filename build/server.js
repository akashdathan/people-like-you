"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _services = require("./services");

var _datastore = require("./datastore");

var _expressValidator = require("express-validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = (0, _express["default"])();
var PORT = 3000;
app.use(_express["default"].json());

var PluServer =
/*#__PURE__*/
function () {
  function PluServer() {
    _classCallCheck(this, PluServer);
  }

  _createClass(PluServer, null, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.registerGetPeopleLikeYou();
                this.registerAddPerson();
                _context.next = 4;
                return _datastore.DataStore.init();

              case 4:
                console.log('DataStore Entries:', _datastore.DataStore.data.length);
                app.get('/', function (req, res) {
                  return res.status(200).send({
                    'message': 'Server Up!!!'
                  });
                });
                app.post('/', function (req, res) {
                  return res.status(200).send({
                    'message': 'Server Up!!!'
                  });
                });
                app.listen(PORT, function () {
                  console.log("Server running on port ".concat(PORT, "..."));
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "registerGetPeopleLikeYou",
    value: function registerGetPeopleLikeYou() {
      var url = '/people-like-you/:age?/:latitude?/:longitude?/:monthlyIncome?/:experienced?';
      app.get(url,
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(req, res) {
          var peopleLikeYou;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _services.PluServices.getPeopleLikeYou(req.query, 10);

                case 2:
                  peopleLikeYou = _context2.sent;
                  return _context2.abrupt("return", res.status(200).send({
                    peopleLikeYou: peopleLikeYou
                  }));

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "registerAddPerson",
    value: function registerAddPerson() {
      var url = '/add-person';
      app.post(url, [(0, _expressValidator.check)('name').isLength({
        min: 3
      }), (0, _expressValidator.check)('age').isNumeric(), (0, _expressValidator.check)('latitude').isNumeric(), (0, _expressValidator.check)('longitude').isNumeric(), (0, _expressValidator.check)('monthlyIncome').isNumeric(), (0, _expressValidator.check)('experienced').isBoolean()],
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee3(req, res) {
          var errors, resp;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  errors = (0, _expressValidator.validationResult)(req);

                  if (errors.isEmpty()) {
                    _context3.next = 3;
                    break;
                  }

                  return _context3.abrupt("return", res.status(422).json({
                    errors: errors.array()
                  }));

                case 3:
                  _context3.next = 5;
                  return _services.PluServices.addPerson(req.body);

                case 5:
                  resp = _context3.sent;

                  if (!resp) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt("return", res.status(422).json({
                    errors: [{
                      msg: resp
                    }]
                  }));

                case 8:
                  return _context3.abrupt("return", res.status(200).send({
                    status: true
                  }));

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }]);

  return PluServer;
}();

exports.PluServer = PluServer;