---
title: "Zero Trust Strategy: What is Zero Trust Architecture?"
summary: "Understanding the core concepts of Zero Trust Architecture."
date: "2022-04-05"
tags:
- Cybersecurity
- Security
draft: false
---

# Zero Trust Strategy:  What is Zero Trust Architecture?
Zero Trust has become a constantly used "buzzword" and depending on who you ask, their definition of zero trust can be completely different. The main reason I think we are hearing this phrase being used so often ties back to how environments are traditionally configured, where users, devices, and network traffic have an assumed level of trust. The concept of Zero Trust has to be applied as a strategy, or foundation, to the entire environment. There is nothing mind-blowing here. It really comes down to designing and implementing good security practices. 

## Zero Trust Core Concepts
To describe Zero Trust in more detail, I like to break it down into a few core concepts:

1. Assume the network is hostile. Traditionally, you might be under the impression that firewalls or intrusion detection devices separated the "trusted" internal network from the "untrusted" Internet. These devices can restrict control for simple things like IP addresses, ports, or even services. The trust is then attributed to anything embedded in the network. Adversaries are really good at bypassing those simple controls and gaining this attributed trust. Once inside, lateral movement can be completely unimpeded.  

2. Your environment contains active threats. Major breaches still take place despite environments having extensive defensive measures in place. This emphasizes the need for continued monitoring and analysis of network artifacts. You also cannot assume parts of your network are low risk, thus requiring little protection, or that vendor solutions spouting machine learning and artificial intelligence will solve all your problems. 

3. Every user, device, and network flow is authenticated and authorized. This extends beyond simple authentication and can be implemented using the Kipling method. This means asking the Who, What, When, Where, Why, and How for everything and ensuring you have the tools or data to see and restrict this information. 

4. Network policies are dynamic and calculated from multiple telemetry sources. A completely implemented Zero Trust policy cannot be implemented in a single day. This requires continued analysis of a changing network, implementation of new controls, and a continuous inventory plan to identify the necessary applications, assets, and services within a network. As environments evolve, your implementation needs to evolve with it. 

Zero Trust is not easy and the hardest part may be driving the cultural change that forces different departments to share and coordinate information. However, the cost of not implementing good security practices can always be calculated by looking at the growing number of data breaches and ransomware that plague every organization.

## U.S. Federal Guidance - Executive Order
On May 12, 2021, U.S. President Joe Biden released an [Executive Order on Improving the Nation's Cybersecurity](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/)). This order outlined a lot of direction towards modernizing the Federal Government's approach to cybersecurity to include Zero Trust.

Some excerpts from the Executive Order:
> The Federal Government must adopt security best practices; advance toward Zero Trust Architecture;

>develop a plan to implement Zero Trust Architecture, which shall incorporate, as appropriate, the migration steps that the National Institute of Standards and Technology (NIST) within the Department of Commerce has outlined in standards and guidance, describe any such steps that have already been completed, identify activities that will have the most immediate security impact, and include a schedule to implement them

>the term “Zero Trust Architecture” means a security model, a set of system design principles, and a coordinated cybersecurity and system management strategy based on an acknowledgement that threats exist both inside and outside traditional network boundaries.  The Zero Trust security model eliminates implicit trust in any one element, node, or service and instead requires continuous verification of the operational picture via real-time information from multiple sources to determine access and other system responses. 

## Zero Trust Architecture Strategy Memorandum
Additionally, on January 26, 2022, the Federal Government released a [Federal zero trust architecture (ZTA) strategy memorandum](https://www.whitehouse.gov/wp-content/uploads/2022/01/M-22-09.pdf). 

Within 30 days of publication, agencies were required to designate a lead for implementing a zero trust strategy. Within 60 days, agencies must expand upon their zero trust plans required from Executive Order 14028 and submit to OMB and CISA. The full memorandum includes a set of cybersecurity standards and objectives Federal agencies must comply with by the end of Fiscal Year 2024. 

This is a much needed, but very aggressive approach to forcing compliance and ensuring Federal agencies are following good security practices. While guidelines are provided, the details of actually accomplishing the tasks within this mandate leaves the expertise to individual agencies, many of which don't have the necessary skills or experience. For example, one strategic goal is to have a complete inventory of every device it operates with the ability to prevent, detect, and respond to incidents on any one of those devices. Consider your own environment and how far away you might be from accomplishing that goal. The largest gap to actually implementing ZTA is delivering the necessary education to the individuals that need it. 

## Next Steps
Despite this blog being focused on U.S. Federal policy, the techniques and overall strategy goes back to implementing good security practices. Whether you are reading this as part of a mandatory implementation or just want to get a better understanding of Zero Trust Architecture to improve your security posture, I hope this reference serves as a useful starting place on your ZTA journey. 

If you'd like to learn more, check out [Pluralsight's Zero Trust Path](https://www.pluralsight.com/paths/zero-trust-architecture-zta)

**Resources:**
- [NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture)
- [Executive Order](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/05/12/executive-order-on-improving-the-nations-cybersecurity/)
- [OMB's Zero Trust Memorandum](https://www.whitehouse.gov/wp-content/uploads/2022/01/M-22-09.pdf)