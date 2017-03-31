var test1 = require('./spec/testdata/test1');
var test2 = require('./spec/testdata/test2');
var InternetCrawler = require('./crawler');

var crawler = new InternetCrawler();
console.log(crawler.crawl(test1));
console.log(crawler.crawl(test2));
