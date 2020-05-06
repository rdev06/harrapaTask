const config = {
  port: process.env.PORT || 5003,
  mongodbOptions: {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  deployPass: 'deployKey',
  apiKey: 'roshanKey',
  //-----------------
  jwt_secrect_key: 'i love coding',
  jwt_expiresIn: '30d',
  bcryptGenSaltLength: 10
};
const development = {
  mongodb: 'mongodb://localhost:27017/harrapa',
  port: 5003
};
const production = {
  mongodb: 'mongodb://harrapa:password123@localhost:27017/harrapa'
};
let environment = process.env.NODE_ENV || 'development';
console.log('Loaded Configs : ' + environment);
module.exports = Object.assign(config, eval(environment));
