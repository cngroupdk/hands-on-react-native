var Lnf = require("lnf");
var R = require('ramda');
var Twitter = require('twitter');
var dateFormat = require('dateformat');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var MAIN_TAG = 'reactjs';
var OUTPUT_ROOT = path.join(__dirname, 'output');

var params = {
  q: '#' + MAIN_TAG,
  result_type: 'mixed',
  count: '100',
};

function writeOutputFile(now, outputFilename, outputFilenameSuffix, outputData) {
  var outputDir = path.join(OUTPUT_ROOT, dateFormat(now, 'yyyy-mm-dd'), dateFormat(now, 'hh-MM'));
  var outputJSONPath = path.join(outputDir, outputFilename);

  mkdirp(outputDir, function(error) {
    if (error) {
      console.error('Mkdirp Error:', error);
      return;
    }
    var outputJSON = JSON.stringify(outputData, null, 2);
    fs.writeFile(outputJSONPath, outputJSON, function(error) {
      if (error) {
        console.error('WriteFile Error:', error)
        return;
      }
      console.log('-- written:', outputFilename);

      var symlinkPath = path.join(OUTPUT_ROOT, outputFilenameSuffix);
      Lnf(outputJSONPath, symlinkPath, function(error) {
        if (error) {
          console.error('Symlink Error:', error);
          return;
        }

        console.log('-- created symlink:', symlinkPath);
      });
    });
  });
}

function processAndWriteStatuses(statuses, statusMapCallback, now, outputFilenameSuffix) {
    var processedStatuses = R.map(statusMapCallback, statuses);
    var selectedProcessedStatuses = R.reject(status => status._hashtags.length < 1, processedStatuses)
    var groupedStatuses = R.groupBy(R.path(['_hashtags', 0]), selectedProcessedStatuses);

    var outputFilename = dateFormat(now, 'yyyy-mm-dd-hh-MM-ss') + '-' + outputFilenameSuffix;
    var outputData = {
      'groups': groupedStatuses,
      'filename': outputFilename,
    };
    writeOutputFile(now, outputFilename, outputFilenameSuffix, outputData);
    return outputData;
}

function getHastags(status) {
  return R.reject(R.equals(MAIN_TAG), R.map(R.prop('text'), R.path(['entities', 'hashtags'], status))) || [];
}

function searchFofMatchingStatusses() {
  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
      var statuses = tweets.statuses;
      var now = new Date();
      console.log('---- fetched at:', now);

      var outputFilenameSuffix = 'simple.json'

      processAndWriteStatuses(statuses, (status) => {
        return {
          _hashtags: getHastags(status),
          user: R.pick(['screen_name', 'profile_image_url_https'], status.user),
          text: status.text,
          created_at: status.created_at,
        };
      }, now, 'simple.json');

      var outputData = processAndWriteStatuses(statuses, (status) => {
        return R.merge(status, {
          _hashtags: getHastags(status),
        });
      }, now, 'full.json');

      console.log(JSON.stringify(Object.keys(outputData.groups), null));
    } else {
      console.error('Twitter API Error:', error);
    }
  });
}

searchFofMatchingStatusses();
setInterval(searchFofMatchingStatusses, 5500);
