---
title: "Converting iptables to nftables rules"
linkTitle: "iptables to nftables"
date: 2023-04-23
description: >
  Linux endpoint firewalls are changing. If you need to convert existing iptables rules into nftables, this post if for you!
---

## TL/DR

I made a simple bash script to help automate this:
```bash
#!/bin/bash

# Check if the script is being run as root
if [ "$EUID" -ne 0 ]
  then echo "Please run this script as root"
  exit 1
fi

# Save current iptables rules to current directory
ipFilename="iptables_rules_$(date +%F_%T).bak"
iptables-save > ${filename}

# Initialize nftables rules
nfFilename="nftables_rules_$(date +%F_%T).nft"
iptables-restore-translate -f $filename > $nfFilename

# List rules for validation
nft list ruleset
echo "iptables rules have been converted to nftables rules."
```

Reference:
- [GitHub - Linux Scripts](https://github.com/Oofles/linux-scripts)

## Explaining the key differences

iptables and nftables are both linux endpoint firewalls, used to manage network traffic. They act as a sort of security guard, deciding which data packets are allowed to enter, leave, or move within a network.

Iptables is the older of the two and has been the go-to tool for many years. It uses a set of rules called "tables" to filter and manipulate network traffic. However, iptables has some limitations, such as complex syntax and lack of flexibility.

Nftables, on the other hand, is a more modern and versatile tool, designed to overcome the limitations of iptables. Here are some benefits of using nftables:

1. Simplified syntax: Nftables uses a more straightforward and consistent language, making it easier to understand and maintain.
2. Improved performance: Nftables is built on a more efficient framework, which allows for better performance, especially when dealing with large numbers of rules.
3. Better flexibility: Nftables allows users to define custom data structures, which enables more advanced filtering and traffic management scenarios.
4. Easier extension: Nftables has a modular design that makes it simpler to add new features, providing better support for future protocol developments.

## Part 1 - Install nftables

1. Update and install packages:
```bash
sudo apt update  
sudo apt install binutils nftables iptables-nftables-compat
```

2. Enable the nftables service:
```bash 
# Enable the service
sudo systemctl enable nftables.service
```

## Part 2 - Converting and Transferring the Existing Rules

1. Save the current iptables rules:
```bash
sudo iptables-save > iptables_rules.bak
```

2. Convert the existing rules into nft format:
```bash
sudo iptables-restore-translate -f iptables_rules.bak > nftrules.nft
```

3. Import the rules and verify:
```bash
sudo nft -f nftrules.nft
sudo nft list ruleset
```

And that's it! 

## Additional Notes

### Adding additional rules

The syntax for nftables is simpler, but definitely different if you are used to iptables. Here's an example for opening up port 443 for HTTPS:
```bash
sudo nft add rule ip filter INPUT tcp dport 443 accept
```

### Kali considerations

Running Kali in an enterprise environment? I'm just here to provide info, you do you!

If you are setting up nftables on Kali, there's an additional step you must take. Loopback traffic must be explicitly allowed:
```bash
sudo nft add rule ip filter INPUT iif lo accept
```
