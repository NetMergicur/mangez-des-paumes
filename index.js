const TwitBot = require('./lib/twit-bot')

var args = process.argv.slice(2);

if (args.length !== 4) {
    console.log('problem with arguments' +
        'Expect: consumer_key,consumer_secret, access_token,access_token_secret ')
    process.exit(1)
}

const config = {
    consumer_key: args[0], consumer_secret: args[1],
    access_token: args[2], access_token_secret: args[3]
}
console.log('Launching config bot with following config:\n%s', config)

var tb = new TwitBot(config)

tb.postImage("I'm Baaaaaaaaaack", 'images/guignols-im-back.jpg')
tb.watch({track: '#NecMergitur'}, (tweet) => console.log(tweet))
