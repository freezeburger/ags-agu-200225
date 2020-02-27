const got = require('got');
const gotGoogle = got.extend({
    prefixUrl: 'https://search.lycoss.fr/web/?q='//,'http://google.com/search?q'
});

module.exports.request = search => gotGoogle(search).then( response => {
    //console.log(response)
    return response.body.replace(/<script.*>.*<\/script>/ims,'');
}).catch(err => console.log(1234,err))
