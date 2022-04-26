const XML_FEED =
  "https://www.inoreader.com/stream/user/1004829501/tag/user-favorites";

import Parser from "rss-parser";

const parser: Parser = new Parser();

const xmlFeed = async () => {
  const parsedFeed = await parser.parseURL(XML_FEED);
  console.log('parsedFeed: ', parsedFeed);
  return parsedFeed;
};

export default xmlFeed;
