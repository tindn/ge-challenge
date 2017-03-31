var InternetCrawler = require('../crawler');
var test1 = require('./testdata/test1');
var test2 = require('./testdata/test2');

describe('crawl all internet pages', function() {
  it('crawls internet 1', function() {
    var crawler = new InternetCrawler();
    var crawlResults = crawler.crawl(test1);
    expect(crawlResults.Success.length).toBe(5);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p1')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p2')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p4')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p5')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p6')).toBeGreaterThan(-1);

    expect(crawlResults.Skipped.length).toBe(4);
    expect(crawlResults.Skipped.indexOf('http://foo.bar.com/p2')).toBeGreaterThan(-1);
    expect(crawlResults.Skipped.indexOf('http://foo.bar.com/p4')).toBeGreaterThan(-1);
    expect(crawlResults.Skipped.indexOf('http://foo.bar.com/p1')).toBeGreaterThan(-1);
    expect(crawlResults.Skipped.indexOf('http://foo.bar.com/p5')).toBeGreaterThan(-1);

    expect(crawlResults.Error.length).toBe(2);
    expect(crawlResults.Error.indexOf('http://foo.bar.com/p3')).toBeGreaterThan(-1);
    expect(crawlResults.Error.indexOf('http://foo.bar.com/p7')).toBeGreaterThan(-1);
  });

  it('crawls internet 2', function() {
    var crawler = new InternetCrawler();
    var crawlResults = crawler.crawl(test2);
    expect(crawlResults.Success.length).toBe(5);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p1')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p2')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p3')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p4')).toBeGreaterThan(-1);
    expect(crawlResults.Success.indexOf('http://foo.bar.com/p5')).toBeGreaterThan(-1);

    expect(crawlResults.Skipped.length).toBe(1);
    expect(crawlResults.Skipped.indexOf('http://foo.bar.com/p1')).toBeGreaterThan(-1);

    expect(crawlResults.Error.length).toBe(0);
  });
});
