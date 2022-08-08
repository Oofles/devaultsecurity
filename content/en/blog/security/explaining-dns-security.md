---
title: "Explaining DNS Security"
linkTitle: "Explaining DNS Security"
date: 2022-08-07
description: >
  This blog post is informational. The main focus is to explain the different forms of DNS security and encryption.
---

# Explaining DNS Security
This blog focuses on simply explaining some necessary concepts. The next blog dives into the considerations and problems when implementing these technologies:
- [The Tragedy of DNS Security](https://www.devaultsecurity.com/blog/2022/08/08/the-tragedy-of-dns-security/)

These terms often get confused and misused. It's important to understand the functionality and goal of each:
- **Verification**
	- DNSSEC - Digital signatures for DNS records
- **Encryption** 
	- DNS over HTTPS (DoH) - Sends DNS records tunneled through HTTPS 
	- DNS over TLS (DoT) - Uses TLS encryption on top of the DNS messages

## DNSSEC - DNS Security Extensions
**Overview:**
- Digital signature to sign DNS records
- Used to verify the record comes from its authoritative name server (not altered en-route)
- Used as a security mechanism to defend against man-in-the-middle (MitM) attacks

DNSSEC uses a private/public key pair. Public keys are published using DNS and the private keys is kept safe. The private key signs individual DNS records for a specified zone. This creates digital signatures that are also published with DNS. When a DNS lookup happens, the recursive name server will also request the DNSSEC key associated with the zone. All records for that zone can then be verified to check their integrity.

It's important to not that DNSSEC is a server-to-server protocol. While the recursive name server can perform validation, no DNSSEC is performed between the client and the recursive name server.

In order to support certificate signing, DNSSEC implements a few new DNS record types:
- RRSIG - the cryptographic signature for a record set
- DNSKEY - public signing key
- DS - name of the delegated zone
- NSEC(3) - used to verify non-existence of a record

For a much more detailed explanation, Christopher Makarem has an awesome writeup:
- [How DNSSEC Works](https://medium.com/iocscan/how-dnssec-works-9c652257be0)

## DoT - DNS over TLS
**Overview:**
- Encrypts DNS requests and responses with TLS encryption
- Uses port 853 by default
- Used as a security mechanism to prevent eavesdropping

Similar to how we encrypt HTTP traffic with TLS encryption, DoT is performing the same actions and uses port 853 by default. The underlying protocol remains the same with a layer of encryption. 

While this is overall a more secure implementation, there a few considerations:
- By implementing an additional port, any network traffic filters (like firewalls) need to be updated to allow port 853.
- DNS is a very simplistic protocol sent over UDP to remain fast and efficient. Adding a layer of encryption can cause performance problems on resource-strapped systems.
- Clients are typically not configured to perform DoT requests directly to the authoritative name servers, thus not qualifying as an end-to-end encrypted protocol. You can support hop-to-hop, but widespread configuration is necessary.

## DoH - DNS over HTTPS
**Overview:**
- Sends DNS requests and responses using HTTPS
- Uses port 443 by default
- Used as a security mechanism to prevent eavesdropping

DoH works very similarly to DoT, but uses an existing protocol (HTTPS) to send the DNS requests instead of encrypting them directly. This is typically an easier configuration, but introduces additional problems with traffic analysis and being able to perform content filtering. 

In additional to the concerns mentioned in the DoT section:
- Having a centralized DNS server becomes much more complicated. Each application making DNS requests must be configured to use DoH and restricted to the necessary server.
- Content filtering (adult content, child abuse sites, malicious domains, etc.) must also be configured at an application level and requires very mature IT operations.

## Summary
Hopefully this provides a high-level overview on the various protocols associated with DNS security. As noted above, my next blog covers the concerns of implementation in much further detail.