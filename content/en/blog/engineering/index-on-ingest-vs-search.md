
---
title: "Index on Ingest vs. on Search"
linkTitle: "Index on Ingest"
date: 2020-08-23
description: >
  Certain security products will index your data at different times. We'll take a look at a ingestion time vs. search time and how that pertains to security operations.
---

## Index Time

To set the frame for this, let's use two common databases used in Security: Elasticsearch and Splunk. Within any database, the data you ingest will need to be indexed so you can search across that data. Depending on your end goal, some additional consideration needs to be given for how that database operates.

You can think of this like an index for a book. The index will contain page numbers for the words that you might need to look up. Similarly, our database will need to have a fast way to lookup where certain words exist in all our security logs. So, it creates an index. 

Creating this index takes processing power - and can take a decent amount of time to accomplish depending on your setup. So when do we perform this process?

## Index on Search (Splunk)

Perhaps we want to wait until we perform searches to create the index. You might think this is silly, but this actually gives us a lot of flexibility in performing a search.

Let's say that I don't know what the logs coming into my database are going to look like. So when I read through some of the content, I find a place in the logs where a hostname exists. The problem is that the hostname is in the middle of a bunch of other text, and I don't have a way to say, "Show me all the logs where the hostname is equal to X." 

At this point, even though the data has already been ingested, I can select the section where the hostname exists and define that field. Now I can search all my logs for the specified hostname - the database will index all existing documents - and return my results. 

This becomes extremely powerful when the log format is unknown, or you don't have a lot of time to create the parser to define the logs fields before ingestion.

The problem with this method depends on search complexity and log format. Every search you perform can require a full index of the logs. This means search results can take anywhere from a minute or two to a few hours to return!

## Index on Ingest (Elasticsearch)

So what's the alternative? Let's take a look at the log format ahead of time and define fields before they are ingested. In the case of Elasticsearch, that would be creating an ingest pipeline or using Logstash. Now when we ingest the data, the indexing is performed before we can perform any searches. 

The difficult part in this process is defining out every field we want to search or filter on. However, once that process is complete, the data has been pre-indexed so our searches return results extremely fast! 

Does this mean that once the data has been indexed, you are stuck with it? Nope - you'll need to re-index the data and perform that operation again. Usually you'll want to ingest some test logs until you've settled on a preferred index template.

### Full-Text Search

It's important to note that both databases discussed offer the ability to perform full-text search. Meaning, I can search for the word "failed", and all logs containing that word will be returned. The real question is how fast you want that result to come back.

## Which one should I use?

Heads up, my opinion is biased! Well, so is everyone's but maybe mine more so in this case? I do work for Elastic, but I've been a Splunk fanboy in the past. This is an unsponsored blog post, and I'm a strong proponent of using whatever tools work for your specific usecase!

So to answer this question properly, you need to ask yourself some questions:
* Do I know what the logs look like?
* Do I know what fields I'll need to perform searches or calculations on?
* How fast do I need the searches to return results?
* Do I have the time to create index patterns before security operations begin?

For me, most of my experience comes from performing incident response or threat hunting on known networks. In this case, I know what the fields look like and I need the search results to come back super fast! I'm willing to take the performance hit up-front, that way when frantically performing searches during an incident response, I'm not waiting on the database. 

##### Additional Resources

* [Elasticsearch - Data In](https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html)
* [Elastic Common Schema](https://www.elastic.co/guide/en/ecs/current/ecs-reference.html)
* [Splunk - Index Time vs. Search Time](https://docs.splunk.com/Documentation/Splunk/8.0.5/Indexer/Indextimeversussearchtime)
