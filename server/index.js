var R  = require('ramda');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var MAIN_TAG = 'reactjs'

var params = {
  q: '#' + MAIN_TAG + ' #success OR #fail OR #ok OR #super OR #great',
  result_type: 'mixed',
  count: '100',
};

function searchFofMatchingStatusses() {
  client.get('search/tweets', params, function(error, tweets, response){
    if (!error) {
      var statuses = tweets.statuses;
      var processedStatues = R.map((status) => {
        return {
          _hashtags: R.reject(R.equals(MAIN_TAG), R.map(R.prop('text'), R.path(['entities', 'hashtags'], status))) || [],
          user: R.pick(['screen_name'], status.user),
          text: status.text,
          created_at: status.created_at,
        };
      }, statuses);
      var out = {
        'groups': R.groupBy(R.path(['_hashtags', 0]), processedStatues)
      };

      console.log('----', Date());
      console.log(JSON.stringify(out, null, 2));
    } else {
      console.error('Error: ', error);
    }
  });
}

searchFofMatchingStatusses();
setInterval(searchFofMatchingStatusses, 5500);
