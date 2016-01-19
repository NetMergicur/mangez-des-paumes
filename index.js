'use strict';

const TwitBot = require('./lib/twit-bot');
const Http = require('http');

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
console.log('Launching config bot with following config:\n%j', config)

var tb = new TwitBot(config)

// https://twitter.com/search?f=tweets&q=%23touchepasauxguignols%20OR%20%23lesguignols%20from%3A%E2%80%8FSauvonsGuignols%20since%3A2015-08-04%20until%3A2016-01-04&src=typd
// tb.T.get('search/tweets', { q: '', count: 100 }, (err,data)=>console.log('>>>%j',data))
/*
tb.T.get('search/tweets', { q: '#touchepasauxguignols #lesguignols from:SauvonsGuignols since:2015-08-03 until:2015-08-05', count: 1},
    (err, data) => {
        if(err) return console.error('FAILED: %j', err)
        const id = data.search_metadata.max_id
        console.log('targerting: %d', id)
        tb.postRetweet(id)
    })
//*/
console.log('starting to watch bash to keyword #pomme')
tb.watch({track: '#pomme'}, (tweet) => {
    console.log('Retweeting "%s" by %s', tweet.text, tweet.user.name);
    tb.postRetweet(tweet.id_str);
})
tb.watch({track: '#pommes'}, (tweet) => {
    console.log('Retweeting "%s" by %s', tweet.text, tweet.user.name);
    tb.postRetweet(tweet, "Une #pomme avertie en vaut deux! 🍏  🍎");
})

// TODO: like


const port = process.env.PORT || 3000
Http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('https://twitter.com/MangezDesPaumes');
}).listen(port, () => console.log('NanoServer started on port %d', port));