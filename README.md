# Mangez des Trolls

Trolleur Cibleur pour Twiteur


# A propos

Basé sur [APi de streaming de twitter](https://dev.twitter.com/streaming/public)
and [node `twit twitter API client](https://github.com/ttezel/twit).



## Des premiers tweets

```js
T.post('statuses/update', { status: 'Helllllllllllooooooowwww' }, function(err, data, response) {
    if (err) console.err('Dawn it, it failed:\n%s', err)
    console.log(data)
})

```