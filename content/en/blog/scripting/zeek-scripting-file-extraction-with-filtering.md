---
title: "Zeek Scripting - File Extraction with Filtering"
linkTitle: "Zeek - File Extraction"
date: 2021-12-21
description: >
  Using Zeek Scripting to filter and perform file extraction for incident response.
---


# File Extraction with Filtering
Heads up! There's nothing mind blowing here, just a simple Zeek script with a use case for incident response. If you are curious to know more, then please read on! If you are just here for the script -- feel free to grab it here and I hope it's useful.

## TL/DR - The Script!
The script is doing two things here:
- First, filtering for a specific host and port
- Second, applying the extract and MD5 analyzer to the filtered traffic

**filter-file-extract.zeek**
```c
redef PacketFilter::default_capture_filter="host 172.31.37.10 and port 445";

event file_new(f: fa_file)
{
        Files::add_analyzer(f, Files::ANALYZER_EXTRACT);
        Files::add_analyzer(f, Files::ANALYZER_MD5);
}
```

Execute:
```bash
zeek -Cr incident.pcap 
```

## The "Why?"
Zeek has a phenomenal file analysis framework capable of a lot of things. I especially love it for its file extraction capabilities which is extremely helpful when doing incident response or malware analysis when given network traffic.

However, if you've attempted the file extraction capabilities before, you may have quickly been overwhelmed by the massive amount of files! So, we've got to filter the traffic down first. 

> Note: You could use tcpdump to filter the PCAP down first, and then run the Zeek script, but this adds an additional step and can eat up valuable time during an incident.

## Scenario
For the sake of a made-up incident, let's say you were investigating and found internal client to client communication over SMB with some files transferred. The client in question is 172.31.37.10.

## BPF Filtering
Zeek uses Berkeley Packet Filtering to support it's capture filter, so we'll need to use that syntax. For the scenario, we'll need to filter on two things: the IP and the port.

BPF Filter:
`host 172.31.37.10 and port 445`

Now inside the script, we can redefine the capture filter to limit the connections down to only what we want.

Applied into the Zeek script:
`redef PacketFilter::default_capture_filter="host 172.31.37.10 and port 445";`

> Note: You'll need to change the BPF filter to meet your needs!

## File Extraction!
OK, the good part! Zeek is an event driven language, meaning that it will execute code when certain events are seen. The first part tells Zeek to execute the code anytime a new file is seen.

`event file_new(f: fa_file)`

The next part is the meat of the script, telling Zeek to apply two analyzers to every file seen. Syntax is important here, so make sure your code is contained inside the squiggly braces `{}` and each line ends with a semi-colon `;`. 
- `ANALYZER_EXTRACT` - No surprise here, will extract the files!
- `ANALYZER_MD5` - This will give us the MD5 hash for each file seen - I'll explain why in a minute (Zeek also support SHA1 and SHA256 hashing).

```
{
        Files::add_analyzer(f, Files::ANALYZER_EXTRACT);
        Files::add_analyzer(f, Files::ANALYZER_MD5);
}
```

## The Results
Now we can execute!
`zeek -Cr incident.pcap filter-file-extract.zeek`

![image](/static/zeek-file-extract.png)

Great! Ok, what happened? 

So Zeek ran and generated logs! Those logs are only going to contain information about the filtered traffic. It will also generate a new log called "packet_filter.log" with information about whether your filter successfully initialized and ran. 

Zeek also created a new folder called "extract_files" where it created a bit-for-bit copy of any files seen. Here we see two files were created. 

Congratulations! Now you can perform static file analysis or pass on these files to your malware analysis team!

> IMPORTANT NOTE! If you are extracting potentially malicious files, please be careful not to accidentally run any of the files!

### File format
Still want more? Great! So the files are in a weird looking format, right? Let's break that down. 

Example:
`extract-1636568782.301062-SMB-FTHEdn1YP6DEL3M0yi`

Broken down:
- `extract` - All files will start with the word extract (In case you forgot you extracted it?)
- `1636568782.301062` - The timestamp, in epoch time format 
	- (Note: in Linux, `date -d @1636568782.301062` will convert that to human readable)
- `SMB` - The application protocol the file was detected in
- `FTHEdn1YP6DEL3M0yi` - The File Unique ID. This can be used for cross-correlation with the "files.log"

### What about the MD5?
Cool, you didn't forget! What we are trying to avoid here is duplicating effort by performing file analysis on the same files. A really easy way to prepare for this is to hash the files when you extract them.

Let's take a look at the "files.log" from the previous example (using `zeek-cut` to extract only the fuid and md5 fields):

![image](/static/zeek-cut-md5.png)

Here we can see the two files created and they both have the same MD5 hash, letting us know they are the same file. 

## References
- [File Analysis — Book of Zeek (git/master)](https://docs.zeek.org/en/master/frameworks/file-analysis.html)
- [Berkeley Packet Filter - Wikipedia](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)