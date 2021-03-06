function InternetCrawler() {}

InternetCrawler.prototype.crawl = function(internet) {
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

InternetCrawler.prototype.visitPage = function(address) {
  if (this.isLinkParsed(address)) {
    this.addSkippedLink(address);
    return;
  }
  var page = this.findPage(address);
  if (page === undefined) {
    this.pagesError.push(address);
    return;
  }
  this.pagesVisited.push(address);
  var unparsedLinks = this.crawlPage(page);
  unparsedLinks.forEach(link => {
    this.visitPage(link);
  });
};

InternetCrawler.prototype.crawlPage = function(page) {
  var unparsedLinks = [];
  for (var i = 0; i < page.links.length; i++) {
    var link = page.links[i];
    if (this.pagesCrawled.indexOf(link) === -1 && this.findPage(link) !== undefined) {
      this.pagesCrawled.push(link);
    }
    if (this.isLinkParsed(link)) {
      this.addSkippedLink(link);
    } else {
      unparsedLinks.push(link);
    }
  }
  return unparsedLinks;
};

InternetCrawler.prototype.addSkippedLink = function(link) {
  if (this.pagesSkipped.indexOf(link) === -1) {
    this.pagesSkipped.push(link);
  }
};

InternetCrawler.prototype.isLinkParsed = function(link) {
  if (this.pagesVisited.indexOf(link) !== -1) {
    return true;
  } else if (this.pagesError.indexOf(link) !== -1) {
    return true;
  }
  return false;
};

InternetCrawler.prototype.findPage = function(address) {
  return this.internet.pages.find(page => {
    return page.address === address;
  });
};

module.exports = InternetCrawler;
