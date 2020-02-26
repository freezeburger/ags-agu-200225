const got = require('got');
const gotGoogle = got.extend({
    prefixUrl: 'https://search.lycos.fr/web/?q='//,'http://google.com/search?q'
});

module.exports.request = search => gotGoogle(search).then( response => {
    //console.log(response)
    return response.body.replace(/<script.*>.*<\/script>/ims,'');
}) 
