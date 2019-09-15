"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataStore = void 0;

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import * as csv from 'csv-parser'
var csv = require('csv-parser');

var MAX_DATA = 500000;
var DATA_PATH = path.resolve('./src/datastore/data.csv');

var DataStore =
/*#__PURE__*/
function () {
  function DataStore() {
    _classCallCheck(this, DataStore);
  }

  _createClass(DataStore, null, [{
    key: "init",
    //Loaded into ram since data set is small and db is not used.
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve, reject) {
                  fs.createReadStream(DATA_PATH).pipe(csv()).on('data',
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(data) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _this.data.push(data);

                            case 1:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }()).on('end', function () {
                    resolve(true);
                  }).on('error', function (error) {
                    reject(error);
                  });
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "addEntry",
    value: function () {
      var _addEntry = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(name, age, latitude, longitude, monthlyIncome, experienced) {
        var InputObj;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.data.length >= MAX_DATA)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", 'Cannot Add Anymore Users');

              case 2:
                InputObj = {
                  name: name,
                  age: age,
                  latitude: latitude,
                  longitude: longitude,
                  'monthly income': monthlyIncome,
                  experienced: experienced.toString()
                };

                if (!_lodash["default"].some(this.data, InputObj)) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", 'User Already Exists');

              case 5:
                this.data.push(InputObj);
                return _context3.abrupt("return", false);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addEntry(_x2, _x3, _x4, _x5, _x6, _x7) {
        return _addEntry.apply(this, arguments);
      }

      return addEntry;
    }()
  }]);

  return DataStore;
}();

exports.DataStore = DataStore;

_defineProperty(DataStore, "data", []);