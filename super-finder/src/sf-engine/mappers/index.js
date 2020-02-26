const htmlMiner = require('html-miner');

const setId = arg => {
    arg.globalData.id = arg.globalData.id | 0;
    return ++arg.globalData.id;
}

//https://www.npmjs.com/package/html-miner
const lycosRule = {
    results: {
        _each_: 'div.results.search-results .result-item',
        id:setId,
        title: '.result-title',
        text:'.result-description',
        link:(arg) => arg.$scope.find('.result-title a').attr('href'),
        url:'.result-url'
    }
}


module.exports.map = (html, rule = lycosRule ) =>{
    const jsonData = htmlMiner(html, rule);
    delete jsonData.id;
    return Promise.resolve(jsonData);
} 