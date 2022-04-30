import pick from "lodash/pick";

// use lodash to pick item id (guid), title, html link & published date 
const pickFeedItem = (item: any) =>
  pick(item, ["guid", "title", "link", "pubDate"]);

export default pickFeedItem;
