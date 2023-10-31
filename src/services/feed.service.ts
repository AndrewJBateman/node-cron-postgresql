const XML_FEED =
  "http://feeds.bbci.co.uk/news/world/rss.xml"
  // "https://www.fiercepharma.com/rss/xml";

import Parser from "rss-parser";

const parser: Parser = new Parser();

const xmlFeed = async () => {
  const parsedFeed = await parser.parseURL(XML_FEED);
  return parsedFeed;
};

export default xmlFeed;
