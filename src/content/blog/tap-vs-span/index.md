---
title: "TAP vs. SPAN for Network Security"
summary: "Breaking down the considerations for a TAP vs. a SPAN port when collecting network traffic for security analytics."
date: "2021-12-31"
tags:
- Network Engineering
- Infrastructure
draft: false
---

# TAP vs. SPAN
Which is better, a TAP or a SPAN port? It depends! Unfortunately, there's no easy TL:DR for this one. In a perfect world, we'd have both implemented each covering different use-cases. 

You are capturing network traffic, or maybe just starting to think about how you are going to engineer this solution for analyzing network traffic. Regardless, this question will eventually come up. Even if you are a security analyst, this isn't a simple problem that can be left to our engineering team (if you are lucky enough to have one...). 

This blog post will discuss the pros and cons of each and walk through some key considerations. 

## What is a TAP? A SPAN Port?
I don't want to spend a lot of time getting into the intricacies of each, but I do want to make sure everyone is on the same page here. 

A TAP (Terminal Access Point or Test Access Point) is a dedicated in-line piece of hardware specifically designed to duplicate traffic. A TAP will sit in-line with the network and send a copy of all seen traffic to 3rd interface where your network sensor will be. 
![image](/tap-diagram.png)

---

A SPAN (Switched Port Analyzer) port is a configuration applied to a router or capable switch that will duplicate traffic to another network interface. 
![image](/tap-diagram.png)


> Disclaimer: A SPAN port is technically Cisco's branded implementation of a mirrored port. Because Cisco devices dominated the networking market for so long, SPAN port has become the more commonly referred to phrase. I will continue to refer to it as a SPAN port, but the concepts will apply to any mirrored port configuration.  

---

## TAP

### Pro - Out-of-Band
TAPs are designed to be out-of-band, meaning they aren't configured to be on the network and don't have an IP or MAC address that can be reached.

There are two considerations here, the first being an operational security concern. If we can help it, collecting passively allows us to analyze traffic without the adversary being aware of our presence. This can lead to some intel gain/loss decisions you wouldn't have otherwise.

The second consideration means that the device cannot be manipulated if the network is compromised. Physical access is generally the only means to modify the capture session which allows for a pretty secure implementation. 

### Pro - Forensically Sound
This feature may be non-negotiable depending on your environment and what is important for your capture. If network evidence needs to be presented in a court of law, a TAP is the only collection method that is considered forensically sound. Other methods introduce ambiguity and can be thrown out in many circumstances. 

### Con - Interruption of Network Traffic
Because of it's in-line nature, that means the physical cables need to be unplugged to install the TAP. While this may only be a couple seconds of downtime, those seconds may translate to a lot of money lost for large retail corporations. For this and other mission critical systems, network owners can be very anxious about this short loss.

It's worth mentioning that most TAPs operate in a fail-open state. This means that if the hardware or firmware were to fail for whatever reason, the TAP would turn into a simple pass-through device so you never have to worry about the network stopping due to this one piece of hardware. 

If you have redundant paths at your network boundary, multiple TAPs may be installed without any downtime. However, this leads to the next consideration, expense.

### Con - Expense
Like most network hardware, the price can vary considerable depending on the size and throughput of your network. Regardless, installing a TAP at every network boundary point or at each critical device connection can quickly add up. 

For a home network, I use a [Dualcomm ETAP-2003 1Gb TAP](https://www.dualcomm.com/collections/network-tap/products/usb-powered-10-100-1000base-t-network-tap) (not sponsored), which sits at a reasonable $200. I can't speak to how this one would perform for sustained use on an enterprise network, but it has been perfect for my personal use.

I've used a variety of enterprise TAP solutions with varying results, so I don't want to recommend any brands in particular. The price will highly depend on your network throughput, medium (copper/fiber), and how many links you need to monitor. To give some reference point, a standard Gigamon TAP can easily be over $24,000 (Reference: [Gigamon Pricing - Cybersecurity Pricing *Updated*](https://cybersecuritypricing.org/tag/gigamon-pricing/)). You'll need to do your own research here! 

---

## SPAN Port
### Pro - Captures East-West Traffic
This is the most important consideration for a SPAN port. When we think about analyzing network traffic for certain types of adversarial activity, capturing at our network boundary will only reveal the internal to external traffic (North-South). Through this you may be able to detect initial access vectors, command and control, and exfiltration. What you won't be able to detect is lateral movement, internal scanning and reconnaissance, staging behavior, or internal devices used as a proxy to attack other internal devices. 

A SPAN port can capture that internal traffic (East-West) where there are really easy behavioral indicators to look for! Of course, you have to actually have the network traffic to find it in the first place.  

### Pro - Existing Hardware
Unlike a TAP where you'll need to submit that request for additional hardware to be purchased and maintained, most existing network infrastructure is already capable of mirroring network traffic. This makes for an easy request when it's simply a configuration change to a switch or router. Be prepared to assist the network administration team with this configuration. There are a lot of different ways a SPAN can be configured to include  entire VLANs, individual ports, one-way traffic, only successful traffic, etc. At a minimum, you'll need to see a copy of that configuration to validate you are capturing all the traffic you'd expect to analyze. 

### Con - Loss of Traffic
Two considerations here.

The first is more of an important note to keep in mind. A SPAN port uses the network device's CPU and memory to perform the traffic duplication. This means if you want to configure a SPAN on a switch, it must be consistently sitting under 50% utilization. Otherwise, you'll start dropping packets as it caps out on resources. It's worth noting that the device will prioritize everything over the SPAN, so you won't be dropping "operational" packets, but you will have a loss in the traffic you are analyzing. 

The second revolves around how SPAN ports were originally designed for troubleshooting, not security. Often times, malformed or broken packets will be dropped at the network device since it doesn't know how to route it properly. This means it'll also be dropped before it duplicates it to the SPAN port. These types of packets may be the perfect indicator that something anomalous is taking place. 

### Con - Timestamps
Back to the network device's CPU and memory, the speed at which the traffic is duplicated will vary depending on the current network's throughput. As more traffic is processed, the network device will have to work harder and take longer to duplicate. This can affect analysis when you are attempting to cross-correlate with other activity or determine the exact length of certain conversations. In most instances, the difference is negligible, but something to consider if you have standard spikes in network throughput. 

### Consideration - Remotely Configurable
This can be considered both a pro and a con. On one hand, having the ability to remotely configure and change a SPAN port makes quick pivoting or network changes easily adaptable. However, if we are assuming network compromise, the adversary has the potential to see what is being captured (or what isn't) and perhaps even make changes themselves.   

## Final Thoughts
In conclusion? Well, both solutions are needed to see everything effectively. Keep in mind that TAPs can be installed in-line to critical devices, so they don't need to installed at the boundary. SPAN ports can also be configured to monitor individual interfaces. 

Just starting out? If you've got the budget, please do the research and install a TAP if you can. Once your operations are more mature, configuring the necessary SPAN ports to see the east-west traffic will be your next step. 

Hahahaha, what budget? Trust me, I've been there. Configure a SPAN port (beware oversubscription) and start analyzing traffic. Take the analysis and start providing value! The more value you can prove, both in defense and helping the network/system administrators, the more funding you can justify.