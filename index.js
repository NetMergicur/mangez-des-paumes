var Twit = require('twit')
var Fs = require('fs')

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
var b64content = Fs.readFileSync('images/guignols-win.jpg', { encoding: 'base64' })

// first we must post the media to Twitter
T.post('media/upload', { media_data: b64content }, function (err, data, response) {

    if(err) return console.error('Uploading img failed')

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: 'Ca a marchéé! ', media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
      if (err) console.error('Post twit a échoué failed')
      else console.log('Post twit réussi')

    })
})
