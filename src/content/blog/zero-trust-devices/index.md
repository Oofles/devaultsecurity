---
title: "Zero Trust Strategy: Devices"
summary: "Understanding the second of CISA's five ZTA pillars: Devices"
date: "2022-06-30"
tags:
- Cybersecurity
- Security
draft: false
---

# Zero Trust Strategy: Part 3 - Devices
Parts 1 and 2 can be found here:
- [Zero Trust Strategy: What is Zero Trust Architecture?](https://www.devaultsecurity.com/blog/2022/04/05/zero-trust-strategy-what-is-zero-trust-architecture/)
- [Zero Trust Strategy: Part 2 - Identity](https://www.devaultsecurity.com/blog/2022/05/02/zero-trust-strategy-identity/)

Continuing on in Part 3, we'll be taking a deeper look at the second of CISA's five pillars: Devices. This section focuses on managing asset inventory and addressing your endpoint protection. You may consider both these topics and say to yourself, "we already have an inventory program and protection for the endpoints," however in most environments this is not even close to the required level of implementation.

Per the memo:

>Actions 
>1. Agencies must create reliable asset inventories through participation in CISA’s Continuous Diagnostics and Mitigation (CDM) program. 
>   • CISA will design the CDM program to better support a cloud-oriented Federal architecture. 
>2. Agencies must ensure their Endpoint Detection and Response (EDR) tools meet CISA’s technical requirements and are deployed widely. 
>   • Agencies must work with CISA to identify implementation gaps, coordinate the deployment of EDR tools, and establish information-sharing capabilities, as described in M-22-01.

## Inventorying Assets
I cannot begin to stress how critical having an inventory of assets is to everything. The foundation for being able to establish a network baseline, identify anomalies, and respond to incidents all require the functionality of a useful inventory. And I don't mean having your people go around with a printed out Excel sheet, physically verifying devices and serial numbers... I remember the days as a young Airman physically checking off serial numbers and validating whether devices are in the proper room. This method introduces human error and doesn't help to validate if the proper devices (or rogue devices) are even connected to the network.

When you consider assets, you have to think about both physical devices and the software components that exist within them. With proper inventory management, vulnerabilities such as Log4j should take less than 30 seconds to determine if and where it exists within your environment. You should also be able to identify when rogue devices connect to your network. Most importantly of all, when the configuration is setup, it will save your analysts and administrators a massive amount of time while actually keeping your network more secure.  

---

The memo also requires formal participation in the Continuous Diagnostics and Mitigation (CDM) program:

>As directed by EO 14028, Federal civilian agencies must have formalized their participation in CDM via a memorandum of agreement with DHS. Agencies must create ongoing, reliable, and complete asset inventories, including by leveraging the CDM program.

The CDM program was established back in 2012 and provides a lot of overlapping capabilities that may assist your transition to a Zero Trust environment. At a high level, the program works to assist in these five key program areas:
- Agency and Federal Dashboards
- Asset Management
- Identity and Access Management
- Network Security Management
- Data Protection Management

Do these sound familiar to CISA's Zero Trust pillars? Yeah, I thought so too. While the term Zero Trust is getting a lot of attention, many of the core security concepts remain exactly the same. ZTA introduces some additional compliance components, but ultimately should just be an advancement of your current security approach.

More information on the CDM program can be found here: [CISA - Continuous Diagnostics and Mitigation](https://www.cisa.gov/cdm)

---

If you have already made some transition to the cloud, inventory of those assets is much simpler as most cloud providers make this process considerably easier. CISA will also be developing a program to better assist with cloud-oriented Federal architecture as noted in the memo:

>This is especially practical in cloud environments with rich, granular, and dynamic permission systems. CISA will work toward developing the CDM program to better support a cloud-oriented Federal architecture. For example, CISA may choose to support automated asset discovery using the technical interfaces offered by many commercial cloud infrastructure providers.

### Resources - Inventorying Assets
**Pluralsight Courses:**
- [Information Systems Asset Protection: Monitoring](https://app.pluralsight.com/library/courses/information-systems-asset-protection-monitoring/table-of-contents)
- [Microsoft Endpoint Manager: Inventory, Queries/Collections, and CMPivot with MECM](https://app.pluralsight.com/library/courses/mem-inventory-queries-collections-cmpivot-mecm/table-of-contents)
- [Powershell: Getting Started](https://app.pluralsight.com/library/courses/powershell-getting-started/table-of-contents)

**External Resources:**
- [Microsoft - Visibility, Automation, and Orchestration with Zero Trust](https://docs.microsoft.com/en-us/security/zero-trust/deploy/visibility-automation-orchestration)
- [AWS - System Manager Inventory](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-inventory.html)

## Government-wide Endpoint Detection and Response
The next required component is to implement Endpoint Detection and Response (EDR) across all your endpoints. There is an important distinction here! 

Traditionally you have anti-virus software installed which provides signature-based detection. Signature-based is a reactive approach to security. When an exploit happens, vendors and signature writers will analyze the malware and write a rule that will alert or prevent the activity if it ever sees that signature again. Unfortunately, it is extremely easy for adversaries to change simple things in their malware allowing them to bypass this simple signature-based detection.

EDR is a proactive approach to security by looking at behaviors. A great example of this can be seen by analyzing ransomware. Ransomware works by very quickly encrypting all the files within a device. This behavior is extremely anomalous when you consider what a user typically does on their endpoint. A proper EDR will be able to alert or prevent this behavior from happening regardless of what process is attempting to perform those actions. This is a much more effective approach to securing an environment against advanced adversaries. 

Further details on the implementation of EDR can be found in a previously released Memorandum from back in October of 2021.
- [M-22-01, Improving Detection of Cybersecurity Vulnerabilities and Incidents on Federal Government Systems Through Endpoint Detection and Response](https://www.whitehouse.gov/wp-content/uploads/2021/10/M-22-01.pdf)

---

There are some exceptions to to where you may be able to employ EDR as noted in the memo: 

>Some specialized systems, such as mainframes and connected devices, may not have compatible EDR tools available. These systems are still at risk of compromise or misuse and may require defenses from other zero trust mechanisms to mitigate risk. Other devices (thin clients, for example) may employ a least-privilege design that specifically constrains general purpose computing. Such a design may inhibit the use of common EDR tools but also poses less risk of malicious misuse and is consistent with zero trust principles.

Take a look across your network and determine what your requirements are before installing a configuring an EDR solution. Most EDR software is capable of defending multiple environments including Windows, Linux, Apple, Virtual Machines, and Docker containers. With those requirements documented, you can properly assess a vendor's capability to meeting your organization's needs.

### Resources - EDR
**Pluralsight Courses:**
- [Incident Response: Host Analysis](https://app.pluralsight.com/library/courses/incident-response-host-analysis/table-of-contents)
- [Security Event Triage: Detecting System Anomalies](https://app.pluralsight.com/library/courses/security-event-triage-detecting-system-anomalies/table-of-contents)

**External Resources:**
- [Microsoft Defender for Endpoint](https://www.microsoft.com/en-us/security/business/endpoint-security/microsoft-defender-endpoint)
- [Crowdstrike - Falcon EDR](https://www.crowdstrike.com/products/endpoint-security/falcon-insight-edr/)
- [VMware Carbon Black](https://www.vmware.com/products/carbon-black-cloud-endpoint.html)
- [Elastic Security for Endpoint (Endgame)](https://www.elastic.co/security/endpoint-security)

## Conclusion?
Establishing a proper inventory of all your assets can be a massive undertaking. However, rest assured that once you've embraced automation and done the upfront tasks required to set it up properly, it will save you a massive amount of time in the long-run and ensure you have a more secure environment. How did your organization respond to the Log4j vulnerability? What was the response time and how long did it take you to determine if you were vulnerable? With proper inventory, mature organizations were able to determine the scope of their impact within minutes of notification. 

What about EDR? Some of your networks may already have this covered by a larger DoD program, however the bigger task may be determining what devices may be exempt due to technical limitations and ensuring you have a implemented the proper least-privilege design. 

Good luck on your ZTA implementation! I hope you look forward to the next blog in this series.