function InternetCrawler() {}

InternetCrawler.prototype.crawl = function crawl(internet) {
  this.internet = internet;
  this.pagesVisited = [];
  this.pagesSkipped = [];
  this.pagesError = [];
  this.pagesCrawled = [];

  this.internet.pages.forEach(page => {
    if (this.isLinkParsed(page.address)) {
      return;
    }
    this.visitPage(page.address);
  });

  return {
    Success: this.pagesCrawled,
    Skipped: this.pagesSkipped,
    Error: this.pagesError
  };
};

InternetCrawler.prototype.visitPage = function visitPage(address) {
  if (this.isLinkParsed(address)) {
    this.skipLink(address);
    return;
  }
  var page = this.findPage(address);
  if (page === undefined) {
    this.pagesError.push(address);
    return;
  }
  this.pagesVisited.push(address);
  this.crawlPage(page);
};

InternetCrawler.prototype.crawlPage = function crawlPage(page) {
  var unparsedLinks = [];
  for (var i = 0; i < page.links.length; i++) {
    var link = page.links[i];
    if (this.pagesCrawled.indexOf(link) === -1 && this.findPage(link) !== undefined) {
      this.pagesCrawled.push(link);
    }
    if (this.isLinkParsed(link)) {
      this.skipLink(link);
    } else {
      unparsedLinks.push(link);
    }
  }

  unparsedLinks.forEach(link => {
    this.visitPage(link);
  });
};

InternetCrawler.prototype.skipLink = function skipLink(link) {
  if (this.pagesSkipped.indexOf(link) === -1) {
    this.pagesSkipped.push(link);
  }
};

InternetCrawler.prototype.isLinkParsed = function isLinkParsed(link) {
  if (this.pagesVisited.indexOf(link) !== -1) {
    return true;
  } else if (this.pagesError.indexOf(link) !== -1) {
    return true;
  }
  return false;
};

InternetCrawler.prototype.findPage = function findPage(address) {
  return this.internet.pages.find(page => {
    return page.address === address;
  });
};

module.exports = InternetCrawler;
