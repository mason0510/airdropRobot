var rediz = require('redis'); var redis =
rediz.createClient({ "host": "127.0.0.1", "port": "6379" });

var Q = require('bluebird');
var rediz = require('redis');
Q.promisifyAll(rediz.RedisClient.prototype);
Q.promisifyAll(rediz.Multi.prototype);

redis.on('error', function (err) { 
    console.log(err);
})

function redis_get_string() { redis.set('key',
    ['string'], function(err, res) { redis.get('key', function(err, res) {
        console.log(res);  }); }); };