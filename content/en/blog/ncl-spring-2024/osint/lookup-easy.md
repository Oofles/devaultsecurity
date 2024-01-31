---
title: "NCL - OSINT - Lookup (Easy)"
linkTitle: "ncl-osint-lookup"
date: 2024-01-30
description: >
  NCL - OSINT - Lookup (Easy)
---

# Lookup (Easy)

This section just required a bit of research and Google to find the answers. I've included a bit more information if you are curious.

**Q1: What type of DNS record holds the DNSSEC public signing key?**

A: `DNSSEC`
- The DNSKEY record contains the public key that a DNS zone uses to digitally sign its records. This public key is essential for validating DNSSEC-signed records in the zone, ensuring their authenticity and integrity. DNSSEC (Domain Name System Security Extensions) adds an additional layer of security to the DNS to protect against certain types of attacks, such as cache poisoning and man-in-the-middle attacks.


**Q2: What type of DNS record is used to map hostnames to IPv6 addresses?**

A: `AAAA`

- The AAAA record is an essential part of the Domain Name System (DNS), functioning similarly to the A record that is used for mapping hostnames to IPv4 addresses. However, while A records link domain names to 32-bit IPv4 addresses, AAAA records link them to 128-bit IPv6 addresses, which are necessary due to the larger address space of IPv6.


**Q3: What type of DNS record is used to delegate a DNS zone?**

A: `NS`

- NS (Name Server) records are used to specify the authoritative name servers for a domain or subdomain. When a domain is delegated to a specific set of name servers, the NS records in the parent zone point to those servers. This delegation process is fundamental to how the Domain Name System (DNS) works, as it allows for the distribution of responsibility for specific domains or subdomains to different DNS servers.
