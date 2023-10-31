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
  // {
  //   id: '9cbe9284-d5cd-4d00-b6f7-f856be2b9e27',
  //   title: 'Amgen vows to fight $7.1B tax bill tied to Puerto Rico manufacturing unit',
  //   url: 'https://www.fiercepharma.com/pharma/amgen-vows-fight-71b-tax-bill-tied-puerto-rico-manufacturing-unit',
  //   source: '1303811 at https://www.fiercepharma.com',
  //   date: '2022-04-27T21:13:19.000Z'
  // }
  const rssData = await xmlFeed();
  const pickedData = rssData.items.map(pickFeedItem).map((item: any) => ({
    id: uuidv4(),
    ...pick(item, ["title"]),
    url: item.link,
    source: item.guid,
    date: new Date(item.pubDate).toISOString(),
  }));
  console.log('picked data: ', pickedData);

  // Filter out feed items that are already in the DB
  const allSources = pickedData.map((entry: any) => entry.source);
  const { data: overlappingSourcesDbResult, error: overlappingQueryError } =
    await supabase.from(dbTableName).select("source").in("source", allSources);
  // console.log("data, error: ", {
  //   data: overlappingSourcesDbResult,
  //   error: overlappingQueryError,
  // });
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
