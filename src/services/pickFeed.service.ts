import pick from "lodash/pick";

const pickFeedItem = (item: any) =>
  pick(item, ["guid", "title", "link", "pubDate"]);

export default pickFeedItem;
