---
title: "The Tragedy of DNS Security"
linkTitle: "Tragedy of DNS Security"
date: 2022-08-08
description: >
  There are many considerations when it comes to implementing DNS security protocols. You must understand before paying vendors for things you don't need!
---

# The Tragedy of DNS Security

## TL/DR - DNS Security is Bad (Currently...)!
I'll defend all these thoughts, but in case you don't read any further than this, here's the highlights:
- It's easy for vendors to sell you something by saying "encryption is good"
- DNSSEC doesn't encrypt traffic and requires full-network implementation to be successful
- DNS over HTTPS (DoH) is worse than what we currently have and doesn't solve any problems
- DNS over TLS (DoT) may work eventually, but most organizations aren't ready for it yet

**Working towards secure DNS is a valid effort, but only for those that have both a mature infrastructure and a mature security team.**

**Note:** This blog focuses on implementation in an enterprise environment. Privacy concerns over how this may be implemented with a Internet Service Provider (ISP) will not be covered here.

## What is DNS Security?
If you need to understand the differences in the type of DNS security and encryption, please read this blog post:
- [Explaining DNS Security](https://www.devaultsecurity.com/blog/2022/08/07/explaining-dns-security/)

## Frame the Problem
What is DNS security trying to solve? Answering this root question will be critical in understanding whether a potential solution is even worth implementing. All too often security individuals want to implement security because "security is good" and that's not a valid reason...

DNS security attempts to solve one of the following problems:
1. There's no built-in method for validating the legitimacy of a DNS response, thus vulnerable to a Man-in-the-Middle (MitM) attack
2. DNS requests are sent in clear-text, thus vulnerable to eavesdropping

If a solution doesn't actually solve one of those problems, then you are simply introducing more complexity and potential problems to an absolutely critical protocol. Vendors are always quick to try and sell you a solution because it sounds good - do your research and consider the motivations behind someone's information.

## DNS Validation with DNSSEC
Let's start with ensuring the integrity of DNS records and implementing DNSSEC (DNS Security Extensions). 

### Does it solve the problem?
Kind of... 

Using a public/private key model, recursive name servers can validate the integrity of all DNS requests to ensure they haven't been modified in transit. 

So why only kind of?

DNSSEC is a server-to-server protocol. Unless every single client is able to make direct DNS requests to the authoritative DNS server (which creates all kinds of other problems), then the integrity is only valid from your local recursive name server which is making external requests. This may be enough for you, but DNSSEC doesn't perform any integrity validation between the clients or applications and the local DNS server. 

### What problems does it introduce?
**DNSSEC exposes additional information about all subdomains**

Typical DNS requests are asked an answered on an individual domain level. 
- Does mail.example.com exist?
- Yes, it's here: x.x.x.x

Using DNSSEC, the entire zone content is included in a combined zone record exposing potentially sensitive information.
- Does mail.example.com exist?
- Yes! 
	- example.com is x.x.x.x
	- mail.example.com is x.x.x.x
	- secret.example.com is x.x.x.x
	- etc.

This is done to make the key signing and exchange more efficient, but it creates artifacts that may make larger organizations unwilling to adopt it.

**Note:** NSEC3 is an attempt to solve this, but enumeration is still possible by pulling the hashes and making offline guesses against the  hash list. This is a simple process for most adversaries.

**Key Management and signing configuration**

The most secure method of DNSSEC key signing is offline signing of static zones. This allows you to keep the key secure and disconnected from the network. Unfortunately, this also makes changing DNS information more complicated taking additional time and effort to apply changes. Still, this model works well as long as your DNS information does not change often.

Live-signing DNS records is possible, but the configuration is much more complex and puts the private key at risk.

DNSSEC is also assuming you have proper (and secure) key management. Not a problem if you are already storing keys for something else, but definitely a consideration if that infrastructure needs to be setup.

## Encrypting DNS traffic using HTTPS - DoH
When it comes to encrypting DNS, you've got two options. Let's start with the simpler, but less effective option - DNS over HTTPS (DoH).

### Does it solve the problem?
Maybe...

HTTPS is encrypted, so sending the DNS traffic over this protocol ensures the data is safely encrypted. So what's the problem? Well there are three:

1. In order to ensure you are receiving the correct certificates, the client will indicate the requested domain name with a Server Name Indication (SNI). By default, this is sent in clear text as part of the certificate exchange. The whole point of encrypting the DNS traffic would be to hide the domains we are looking up and if the adversary can instead simply look at the SNI, then we've accomplished nothing. If that's the case, then you must enable Encrypted Server Name Indication (ESNI). The complexity of your environment will determine how difficult this will be, but this must be accomplished at the application level for every client. Using just web browsing as an example, each web browser (Firefox, Chrome, Edge, etc.) will need to be configured, enabling ESNI.

2. Another thing... we are assuming the adversary has the capability of inspecting our network traffic, hence the whole reason we are wanting to encrypt the traffic. However, IP addresses are never encrypted and adversaries can use this to determine (with reasonable certainty) the sites we are browsing to. 

3. Third point - opportunistic mode. Because this is a fairly new protocol that doesn't have wide-spread adoption, you need some way to resolve addresses if the domain or DNS resolver isn't capable of DoH (or DoT). This is called "opportunistic mode" where the client will fall back to using standard DNS if it's unable to resolve an address with DoH. Adversaries can take advantage of this and force a "downgrade" of the protocol across your networking, making it ineffective. "Strict mode" can be used to force clients to only use encryption, but this is a clear trade between reliability and security. In this instance, I don't think the reliability is worth trading away.

### What problems does it introduce?
**Content Filtering**

Using DoH makes content blocking virtually impossible. This includes illegal content, adult filters, advertisements, malicious sites, etc. In most modern environments we perform content blocking using a proxy or the DNS server at a central location. Since the DNS traffic would now be encrypted at the client, the content filters must be moved and configured at the application level on every client within your network. 

Considering how often or quickly you may need to update these filter lists, it makes the logistics unmanageable for any decently sized network. Let's look at an example in the fight against child abuse:

The Internet Watch Foundation (IWF) maintains a consistent list of around 12,000 domains to be blocked that are associated with child abuse. This list is used for broad filtering, giving authorities the time they need to properly take down the site and prosecute the individuals. Regardless of your thoughts on ISP privacy concerns, DoH prevents this process from happening. Mozilla has made some configuration changes to enable DoH by default (dependent on the version), though the pushback in the UK was so big that they reverted their decision (in the UK at least). 

References:
- [ZDNet - Mozilla: No plans to enable DNS-over-HTTPS by default in the UK](https://www.zdnet.com/article/mozilla-no-plans-to-enable-dns-over-https-by-default-in-the-uk/)
- [Sky News - Google's Chrome browser plans 'risk undermining fight against online child abuse', govt warned](https://news.sky.com/story/googles-chrome-browser-plans-risk-undermining-fight-against-online-child-abuse-govt-warned-11734166)

If we consider the need for blocking malicious domains in an enterprise environment, the "bad reputation" domain lists use a similar process.

**Speed and Troubleshooting**

DNS is such a critical protocol to proper function of our domains and Internet browsing. Our infrastructure also relies on DNS being quick and reliable. The transport protocol it uses is UDP, meaning there is no overhead to the packets, making them extremely small and fast since no handshake needs to take place. If there are any errors or packet loss, the client simply makes another request. 

Encrypting DNS adds two additional layers of complexity to the protocol. 
- First, it uses TCP (this is true of DoH and DoT) requiring a handshake for every conversation. This is very minimal per conversation, but on resource constrained environments it can absolutely have an impact on the amount of traffic. 
- Second, troubleshooting becomes much more complicated. Checking DNS is a natural part of attempting to determine network errors when something goes wrong - as DNS is often the problem. Bringing a certificate exchange into the process makes it difficult to determine if the domain itself is down, if there is a problem with the certificate, or if there's a problem with the certificate exchange.  

These considerations require you to have a mature infrastructure or engineering team that is capable of configuring and troubleshooting these types of problems.

**Availability of DNS Resolvers**

Currently, there are a limited number of DNS servers/resolvers capable of supporting DoH or DoT. This problem will be solved over time, however the limited number of servers can be a reliability and speed consideration depending on the criticality of your business or mission functions. 

**Existing detections are obsolete**

Swapping DNS to DoH (or DoT) makes any existing detections within your environment obsolete. Think about your current detection or prevention mechanisms: intrusion detection systems (IDS), SIEM alerts, network firewall rules, host and application firewalls, endpoint detection and response (EDR), etc.

You must now rely on your security vendors to support detections/preventions for these new protocols or write the new defense mechanisms yourself. 

## Encrypting DNS traffic using TLS - DoT
The second encryption option doesn't rely on another protocol, but rather encrypts the DNS packets directly with TLS encryption.

### Does it solve the problem?
In short, yes (mostly)! TLS encryption is applied on top of the DNS packets and port 853 is used as the default port for DoT. 

Now before you get too excited, there are still considerations. IPs are still send in clear-text and "opportunistic mode" is still a thing.

### What problems does it introduce?
**A recap and comparison from DoH**

Similar to DoH, the following problems are still created with DoT:
- Speed
- Troubleshooting
- Availability of DNS Resolvers
- Obsolete detections

However, because DoT uses a separate port and doesn't rely on HTTPS, you can still centralize your proxy or DNS servers to perform proper content filtering. 

**Firewalls and Access**

DoT utilizes a new port - this means firewalls, allow-lists, and network configurations needs to be changed to support this traffic. Once again, the complexity of your environment will determine how complicated this will be.

**Compatibility**

We think of DNS mostly when considering how web traffic works. However, plenty of applications are directly making their own network calls and DNS requests. Because this hasn't been widely adopted, plenty of applications are incapable of utilizing DoT. This will be solved over time as it becomes more widespread, but definitely lowers the effectiveness in the meantime. 


## The Solution - Detection!
Don't use these protocols, it's not worth the tradeoffs! 

Ok, a caveat - Let's say you have an extremely mature infrastructure/engineering team able to design, maintain, and troubleshoot complex environments. And let's say your security team is capable of advanced detections, incident response, and you are performing regular threat hunting and pen-testing across your environment. At this point if you have critical DNS data you need more protected, then a blend of DNSSEC and DoT should be implemented - you are doing great work for the community and I am jealous of your organization's maturity!

So what can you do? Detection! Empower your security team to perform proper analytics on DNS traffic - it's not too difficult to find anomalies with the current state of DNS. As soon as you start using any of the above protocols, this process becomes much more difficult.

Want to know how? Read on!

### DNS Swapping to TCP
As mentioned earlier, DNS uses TCP by default. In fact, the only reason DNS will swap to using TCP is when the packets are over a certain size (larger than 512 bytes). This is typically only seen during a DNS Zone Transfer where an entire record set is copied from one server to another. Within any environment, the number of zone transfers should be limited and only allowed between authorized DNS servers and applications.

When adversaries send too much data using DNS (typical for DNS exfiltration), it will automatically swap to TCP. This is easy to detect since the amount of DNS traffic using TCP is generally really small and easy to baseline.

### Numerous Requests for a Single Domain
Think about how DNS requests and responses work. You need the IP for a domain, so you ask the question: "Where is example.com?". When you get the response, the information is cached so you don't have to keep asking the same question over and over. 

Now let's say an adversary is using DNS for command and control (C2). Multiple packets are going to be sent back and forth from a single client. Seeing a lot of packets to the same domain is an easy indication of something strange happening.

### Entropy Analysis
Adversaries have also been known to randomize or encode the data sent over DNS to hide amongst standard traffic. There are multiple tools and scripts you can use to generate an entropy score - how "random" a string of letters seem compared to normal words. Another clear indication that something weird is happening!

For reference I've included a Zeek script does this for subdomains:
- [GitHub - Pluralsight SORCERI - dnsentropy.zeek](https://github.com/Pluralsight-SORCERI/Incident-Response-Resources/blob/main/zeek-scripts/dnsentropy.zeek)

### So detections, huh?
Yup! And there's plenty more techniques than what I've included here. DNS is one of my favorite places to hunt for adversarial activity and I'm often rewarded with finding malicious artifacts. 

Until you have mature teams and are ready to take on the additional complications of DNS security, enabling or improving the security team's capabilities will be more effective towards ensuring a more security environment. Happy hunting!