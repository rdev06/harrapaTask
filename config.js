const config = {
    port: process.env.PORT || 5003,
    mongodbOptions: {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    deployPass: 'ostindev06',
    apiKey: 'roshanKey',
    //-----------------
    jwt_secrect_key: 'i love coding',
    jwt_expiresIn: '30d',
    //----------------Mail---------------
    mailConfig: {
      service: 'gmail',
      auth: {
        user: 'rdev.dev06@gmail.com',
        pass: 'ostindev'
      }
    }
  };
  const development = {
      mongodb: 'mongodb://localhost:27017/harrapa',
      port: 5003
  };
  const production = {
      mongodb: 'mongodb://localhost:27017/harrapa',
  };
  let environment = process.env.NODE_ENV || 'development';
  console.log('Loaded Configs : ' + environment);
  module.exports = Object.assign(config, eval(environment));