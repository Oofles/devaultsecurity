---
title: "NCL - OSINT - HTTP Headers (Easy)"
linkTitle: "ncl-osint-http-headers"
date: 2024-01-30
description: >
  NCL - OSINT - HTTP Headers (Easy)
---

# HTTP Headers (Easy)

Shameless Plug... I've got a course specifically focused on HTTP for Cyber Security: 
- [Pluralsight - Network Protocols for Security: HTTP](https://www.pluralsight.com/courses/http-network-protocols-security)

Separately, this section has some simple questions that you can use Google to find the answers to. 

**Q1: What HTTP request header is used to denote what URI linked to the resource being requested?**

A: `Referer`

This header indicates the address of the previous web page from which a link to the currently requested page was followed. It's used primarily for identifying where traffic is coming from, for analytics, logging, or security purposes.

For example, if you click a link on `example.com` that takes you to `anotherexample.com`, the HTTP request sent to `anotherexample.com` would include a Referer header with the value `http://example.com`. This lets `anotherexample.com` know that the traffic came from `example.com`.

**Q2: What HTTP request header is used to identify the client software that made the HTTP request?**

A: `User-Agent`

The HTTP request header used to identify the client software that made the HTTP request is the "User-Agent" header. This header contains a string that provides information about the software used to make the request, typically including the name and version of the browser, its underlying operating system, and possibly other software or libraries used in the request process.

For example, a User-Agent header might look something like this:

```
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36
```

This string indicates that the request was made by Chrome version 58 on a Windows 10 system, using the AppleWebKit rendering engine. Web servers often use this information to deliver content in a format compatible with the user's browser.

**Q3: What HTTP request header is used to identify the acceptable content types that can be returned?**

A: `Accept`

This header is used by HTTP clients to tell the server what content types they can handle. It helps in content negotiation, where the server selects the best representation of a resource based on the client's preferences and capabilities.

The `Accept` header can specify multiple content types, each with a quality factor indicating the client's preference level for that type. For example:

- `Accept: text/html`: This indicates the client prefers HTML content.
- `Accept: application/json`: This indicates a preference for JSON content.
- `Accept: text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8`: This indicates a preference for HTML or XHTML, with XML as a less preferred option, and anything else (`*/*`) as the least preferred.

In response, the server uses the `Content-Type` header in its response to specify the type of the content being returned. If the server cannot provide a response in a content type acceptable to the client, it typically sends a `406 Not Acceptable` status code.