var Botkit = require('botkit')
var request = require('request-promise');
var configs = require('./configs');
// console.log('configs:', configs);
var controller = Botkit.slackbot({
  debug: false
});

var BOT = controller.spawn({
  token: configs.bot_token,
}).startRTM();

const YTB_REG = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
function isValidURL(url) {
  return YTB_REG.test(url);
}

controller.on('direct_message', function (bot, message) {
  console.log('message:', message);
  console.log('test:', message.text);
  var url = message.text.substring(1, message.text.length - 1);
    if(isValidURL(url)) {
      var opts = {
        method: 'POST',
        uri: configs.base_api + '/api/songs/slack',
        body: {
          url: url,
          channel: message.channel
        },
        json: true // Automatically stringifies the body to JSON
      };

      request(opts)
        .then(function (result) {
          console.log('result:', result);
        })
    }
});
