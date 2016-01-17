'use strict';

const Twit = require('twit')
var Fs = require('fs')

class Twitbot {

    constructor(config) {
        this.config = config;
        this.T = new Twit(config);
    }


    postTweet(status) {
        this.T.post('statuses/update', {status: status}, (err, data, response) => {
            if (err) console.err('Dawn it, it failed:\n%s', err)
            console.log('Successful post of twitt: %s', status)
        })
    }

    postImage(status, path) {
        var b64content = Fs.readFileSync(path, {encoding: 'base64'})

        this.T.post('media/upload', {media_data: b64content}, (err, data, response) => {

            if (err) return console.error('Uploading img failed')

            // now we can reference the media and post a tweet (media will attach to the tweet)
            var mediaIdStr = data.media_id_string
            var params = {status: status, media_ids: [mediaIdStr]}

            this.T.post('statuses/update', params, (err, data, response) => {
                if (err) console.error('Post twit a échoué failed')
                else console.log('Post twit réussi')
            })
        })
    }

    watch(pattern, callback) {
        var stream = this.T.stream('statuses/filter', pattern)
        stream.on('tweet', callback)
    }

    postRetweet(tweet) {
        // TODO: handle message
        const id = (tweet && typeof tweet === 'object' && 'id' in tweet) ? tweet.id : tweet
        console.log('Trying to retweet %id', id)

        this.T.post('statuses/retweet/:id', {id}, (err, data, response) => {
            if (err) console.error('Post twit a échoué failed\n%s', err)
            else console.log('Post twit réussi')
        })
    }

}

module.exports = Twitbot;