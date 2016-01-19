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
            if (err) console.err('Dawn it, it failed:\n%j', err)
            console.log('Successful post of twitt: %j', status)
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

    postRetweet(tweet, message) {
        // TODO: handle message
        const id = (tweet && typeof tweet === 'object' && 'id_str' in tweet) ? tweet.id_str : tweet
        console.log('Trying to retweet %id', id)

        if (message) {
            // retweets with comments" are just like normal tweets, with a permalink to another tweet at the end
            const username = tweet.user.screen_name;
            this.postTweet(`${message}\nhttps://twitter.com/${username ? `${username}/status` : '/statuses'  }/${id}`);
        } else {
            this.T.post('statuses/retweet/:id', {id}, (err, data, response) => {
                if (err) console.error('Post twit a échoué failed\n%j', err)
                else console.log('Post twit réussi')
            })
        }

    }

}

module.exports = Twitbot;