const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.hashKey || '');
  this.forTime = options.forTime || 86400 * 7;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  //to clear redis
  // client.flushall(function (err, success) {
  //   console.log(success);
  // });
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }
  const redisQuery = JSON.stringify({
    ...this.options,
    ...this._fields,
    ...this._conditions,
    collection: this.mongooseCollection.name,
  });

  const cached = await client.hget(this.hashKey, redisQuery);
  if (cached) {
    const doc = JSON.parse(cached);
    if (Array.isArray(doc)) {
      return doc.map((d) => new this.model(d));
    }
    if (typeof doc === 'object') {
      return new this.model(doc);
    }
    return doc;
  }

  const result = await exec.apply(this, arguments);
  if (result) {
    // client.hmset(this.hashKey, redisQuery, JSON.stringify(result), 'EX', 10);
    client.hset(this.hashKey, redisQuery, JSON.stringify(result));
    client.expire(this.hashKey, this.forTime);
  }
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  },
};
