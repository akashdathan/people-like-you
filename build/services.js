"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluServices = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _datastore = require("./datastore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_AGE_DIFF = 10;
var MAX_INCOME_DIFF = 2000;
var MAX_DIST_DIFF = 1000;
var EXP_WEIGHT = 0.3;

var PluServices =
/*#__PURE__*/
function () {
  function PluServices() {
    _classCallCheck(this, PluServices);
  }

  _createClass(PluServices, null, [{
    key: "addPerson",
    value: function () {
      var _addPerson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(params) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _datastore.DataStore.addEntry(params.name, params.age, params.latitude, params.longitude, params.monthlyIncome, params.experienced));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addPerson(_x) {
        return _addPerson.apply(this, arguments);
      }

      return addPerson;
    }()
  }, {
    key: "getPeopleLikeYou",
    value: function () {
      var _getPeopleLikeYou = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(params, length) {
        var response, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, val, score, selectedObj;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                response = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = _datastore.DataStore.data[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 18;
                  break;
                }

                val = _step.value;
                score = this.getScore(params, val);

                if (!(score === 0)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("continue", 15);

              case 11:
                selectedObj = _lodash["default"].cloneDeep(val);
                selectedObj.score = score;
                response.push(selectedObj);
                if (response.length > length) response = _lodash["default"].takeRight(_lodash["default"].sortBy(response, ['score']), length);

              case 15:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 18:
                _context2.next = 24;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 24:
                _context2.prev = 24;
                _context2.prev = 25;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 27:
                _context2.prev = 27;

                if (!_didIteratorError) {
                  _context2.next = 30;
                  break;
                }

                throw _iteratorError;

              case 30:
                return _context2.finish(27);

              case 31:
                return _context2.finish(24);

              case 32:
                return _context2.abrupt("return", _lodash["default"].sortBy(response, ['score']).reverse().map(function (val) {
                  val.score = Math.round(val.score * 10) / 10;
                  return val;
                }));

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 20, 24, 32], [25,, 27, 31]]);
      }));

      function getPeopleLikeYou(_x2, _x3) {
        return _getPeopleLikeYou.apply(this, arguments);
      }

      return getPeopleLikeYou;
    }()
  }, {
    key: "getScore",
    value: function getScore(query, data) {
      var score = 0;
      score += this.getDistanceScore({
        latitude: query && query.latitude,
        longitude: query && query.longitude
      }, {
        latitude: Number(data.latitude),
        longitude: Number(data.longitude)
      });
      score += this.getIntScore(query.age, Number(data.age), MAX_AGE_DIFF);
      score += this.getIntScore(query.monthlyIncome, Number(data['monthly income']), MAX_INCOME_DIFF);
      if (query.experienced !== undefined) score += Number(query.experienced == data.experienced.toString()) * EXP_WEIGHT;
      return score / 4;
    }
  }, {
    key: "getIntScore",
    value: function getIntScore(queryInt, dataInt, maxDiff) {
      if (!queryInt) return 0;
      var intDiff = Math.abs(queryInt - dataInt);
      if (intDiff > maxDiff) return 0;
      return 1 - intDiff / maxDiff;
    }
  }, {
    key: "getDistanceScore",
    value: function getDistanceScore(qCoordinates, dCoordinates) {
      if (!qCoordinates.latitude && !qCoordinates.longitude) return 0;
      var distance = this.getDistance(qCoordinates.latitude, qCoordinates.longitude, dCoordinates.latitude, dCoordinates.longitude);
      if (distance > MAX_DIST_DIFF) return 0;
      return 1 - distance / MAX_DIST_DIFF;
    }
  }, {
    key: "getDistance",
    value: function getDistance(lat1, lon1, lat2, lon2) {
      if (lat1 === lat2 && lon1 === lon2) return 0;
      var rad1 = Math.PI * lat1 / 180;
      var rad2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(rad1) * Math.sin(rad2) + Math.cos(rad1) * Math.cos(rad2) * Math.cos(radtheta);
      if (dist > 1) dist = 1;
      dist = Math.acos(dist);
      dist *= 180 / Math.PI;
      dist *= 60 * 1.1515;
      dist *= 1.609344; //To Km

      return dist;
    }
  }]);

  return PluServices;
}();

exports.PluServices = PluServices;