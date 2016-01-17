var Twit = require('twit')

var args = process.argv.slice(2);

if (args.length !== 4) {
    console.log('problem with arguments' +
        'Expect: consumer_key,consumer_secret, access_token,access_token_secret ')
    process.exit(1)
}

const config = {
    consumer_key: args[0], consumer_secret: args[1],
    access_token: args[2] , access_token_secret: args[3]
}
console.log('config:')
console.log(config)


var T = new Twit(config)
T.post('statuses/update', { status: 'Helllllllllllooooooowwww' }, function(err, data, response) {
    if (err) console.err('Dawn it, it failed:\n%s', err)
    else console.log(data)
})