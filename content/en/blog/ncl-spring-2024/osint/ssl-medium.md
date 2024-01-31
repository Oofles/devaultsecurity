---
title: "NCL - OSINT - SSL (Medium)"
linkTitle: "ncl-osint-ssl"
date: 2024-01-31
description: >
  NCL - OSINT - SSL (Medium)
---

# SSL (Medium)

First off, a rant... 

>This is a TLS (Transport Layer Security) encrypted key, not SSL (Security Socket Layer). I realize that these terms are often used interchangeably, but they represent different generations of security protocols. 

>SSL is the predecessor of TLS. It was developed by Netscape in the mid-1990s, with SSL versions 1.0, 2.0, and 3.0 being released in quick succession. However, SSL had several security flaws. TLS was introduced in 1999 as an upgrade to SSL 3.0, addressing many of these vulnerabilities. Since then, there have been several versions of TLS (1.0, 1.1, 1.2, and 1.3), with each new release fixing vulnerabilities and improving security.

>SSL protocols have been found to be insecure over time, with vulnerabilities that can be exploited by cyber attackers. For instance, the POODLE attack (referenced earlier in this NCL challenge!) exploited vulnerabilities in SSL 3.0. Consequently, SSL is now considered deprecated and insecure for use.

>I think it's important for professionals to be precise in their language, as this reflects their knowledge of the field and ensures clarity in communication. I also think it's important for NCL, hosting an learning-focused event, to be accurate in their educational content.

Rant over...

Ok, for the fun part! You can use your browser to view the certificate info, but let's use the command-line! I'm using a Linux machine and the `openssl` application.

**Q1: Who is the issuer for Cyber Skyline's SSL certificate?**

A: `Sectigo RSA Domain Validation Secure Server CA`

I'm using the `s_client` option of OpenSSL to connect to the server and then piping the output to `openssl x509` to read the certificate.
```bash
echo | openssl s_client -servername cyberskyline.com -connect cyberskyline.com:443 | openssl x509 -noout -issuer
```

![image](/static/ncl/ssl-1.png)

**Q2: How many bits long is the SSL key?**

A: `2048 bits`

I'm doing something similar here, and then using grep to find the line I want.
```bash
echo | openssl s_client -servername cyberskyline.com -connect cyberskyline.com:443 | openssl x509 -noout -text | grep "Public-Key"
```

![image](/static/ncl/ssl-2.png)

**Q3: How many certificates are in the certificate chain?**

A: `3`

For this one we can use the `-showcerts` option to list all the certs in the chain. And then, each cert begins with "BEGIN CERTIFICATE", so counting these occurrences gives us the total number of certs.
```bash
echo | openssl s_client -servername cyberskyline.com -connect cyberskyline.com:443 -showcerts | grep -c "BEGIN CERTIFICATE"
```

![image](/static/ncl/ssl-3.png)