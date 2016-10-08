//This Controller is used for testing purposes

var bodyParser = require('body-parser');

var errors = require('../errors');
var services = require('../services');
var config = require('../../config');

var middleware = require('../middleware');
var router = require('express').Router();


function saveString (req, res, next) {
	var key = req.body.key;
	var value = req.body.value;

	services.RedisCacheService.storeString(key, value)
		.then(function (status){
			res.body = {};
			res.body.status = status;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function saveHash (req, res, next) {
	var key = req.body.key;
	var keyVals = req.body.keyVals;

	services.RedisCacheService.storeHash(key, keyVals)
		.then(function (status){
			res.body = {};
			res.body.status = status;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function saveList (req, res, next) {
	var key = req.body.key;
	var vals = req.body.vals;

	services.RedisCacheService.storeList(key, vals)
		.then(function (status){
			res.body = {};
			res.body.status = status;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function getString (req, res, next) {
	var key = req.query.key;

	services.RedisCacheService.getString(key)
		.then(function (string){
			res.body = {}
			res.body.value = string;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function getList (req, res, next) {
	var key = req.query.key;
	var start = req.query.start;
	var end = req.query.end;

	services.RedisCacheService.getList(key, start, end)
		.then(function (list){
			res.body = {}
			res.body.values = list;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function getHash (req, res, next) {
	var key = req.query.key;

	services.RedisCacheService.getHash(key)
		.then(function (object){
			res.body = {}
			res.body.values = object;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function updateHash (req, res, next) {
	var key = req.body.key;
	var field = req.body.field;
	var newVal = req.body.newVal;

	services.RedisCacheService.updateHash(key, field, newVal)
		.then(function(status){
			res.body = {};
			res.body.status = status;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		});
}

function getHashField (req, res, next) {
	var key = req.query.key;
	var field = req.query.field;

	services.RedisCacheService.getHashField(key, field)
		.then(function(reply){
			res.body = {};
			res.body.value = reply;
			next();
			return null;
		})
		.catch(function(error){
			next(error);
			return null;
		}); 
}


router.use(bodyParser.json());
router.use(middleware.auth);
router.use(middleware.request);

router.post('/saveString', saveString);
router.post('/saveHash', saveHash);
router.post('/updateHash', updateHash);
router.post('/saveList', saveList);
router.get('/getString', getString);
router.get('/getList', getList);
router.get('/getHash', getHash);
router.get('/getHashField', getHashField);

router.use(middleware.response);
router.use(middleware.errors);

module.exports.router = router;