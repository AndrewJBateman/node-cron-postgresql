import pick from "lodash/pick";
import { v4 as uuidv4 } from "uuid";

import config from "config";
import supabase from "./supabase.service";
import xmlFeed from "./feed.service";
import pickFeedItem from "./pickFeed.service";

const runCronJob = async () => {
  const dbTableName = config.get<string>("dbTableName");

  // Fetch then filter RSS feed data by category
  // assign each filtered item a unique id and pick by title
  const rssData = await xmlFeed();
  const pickedData = rssData.items
    .filter((item: any) => item.categories.includes("News"))
    .map(pickFeedItem)
    .map((item: any) => ({
      id: uuidv4(),
      ...pick(item, ["title"]),
      url: item.link,
      source: item.guid,
      date: new Date(item.pubDate).toISOString(),
    }));
  console.log("pickedData: ", pickedData);

  // Filter out feed items that are already in the DB

  // Get overlapping IDs that are already in the DB
  const allSources = pickedData.map((entry: any) => entry.source);
  const { data: overlappingSourcesDbResult, error: overlappingQueryError } =
    await supabase.from(dbTableName).select("source").in("source", allSources);

  if (overlappingQueryError) {
    throw new Error(overlappingQueryError.message);
  }

  const overlappingSources = overlappingSourcesDbResult.map(
    (entry) => entry.source
  );

  const newData = pickedData.filter((item: any) => {
    return !overlappingSources.includes(item.source);
  });

  if (newData.length === 0) {
    console.log("empty list returned");
    return [];
  }

  // 3. insert new items into DB
  const { data: insertedItems, error: insertionError } = await supabase
    .from(dbTableName)
    .insert(newData);

  if (insertionError) {
    throw new Error(insertionError.message);
  }

  console.log(`Inserted ${insertedItems.length} items into the database`);
  return insertedItems;
};

export default runCronJob;
