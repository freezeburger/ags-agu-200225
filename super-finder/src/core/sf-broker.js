/**
 * SEARCH
 * SEARCH.REQUEST
 * SEARCH.REQUEST.NEW
 * SEARCH.REQUEST.PROCESSING
 * SEARCH.REQUEST.DONE
 * SEARCH.RESULT
 * SEARCH.RESULT.NEW
 */

const PubSub = require('pubsub-js');

PubSub.topics = {
    SEARCH:'SEARCH',
    SEARCH_REQUEST:'SEARCH.REQUEST',
    SEARCH_REQUEST_NEW:'SEARCH.REQUEST.NEW',
    SEARCH_REQUEST_PROCESSING:'SEARCH.REQUEST.PROCESSING',
    SEARCH_REQUEST_DONE:'SEARCH.REQUEST.DONE',
    SEARCH_RESULT: 'SEARCH.RESULT',
    SEARCH_RESULT_NEW:'SEARCH.RESULT.NEW'
}

module.exports = PubSub;

/* const subscriber1 = (msg, data) => {
    console.log(1,msg, data);
};
const subscriber2 = (msg, data) => {
    console.log(2,msg, data);
};

PubSub.subscribe(PubSub.topics.SEARCH,subscriber1)
PubSub.subscribe(PubSub.topics.SEARCH_REQUEST_DONE,subscriber2) */

PubSub.publish(PubSub.topics.SEARCH_REQUEST_PROCESSING, 123456 )