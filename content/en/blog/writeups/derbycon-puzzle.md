---
title: "DerbyCon Puzzle"
linkTitle: "DerbyCon Puzzle"
date: 2022-07-19
description: >
  Solving the mysterious DerbyCon Twitter puzzle.
---

# DerbyCon Puzzle

As everyone reminisces about the good times at Derbycon, I am reminded that I am one of many that never made it out to what sounds like an awesome conference. Though back in January of 2019, they announced they'll no longer by holding any more Derbycons: [Archived Blog Post](https://web.archive.org/web/20190625182731/https://www.derbycon.com/blog/derbycon-9-0-every-beginning-has-an-end/). On 07 May 2022, they teased everyone with a Twitter post and an intriguing video: [DerbyCon Twitter Post](https://twitter.com/DerbyCon/status/1523029299229470720?s=20&t=6hORwuh1tfV0oqnkpf44fQ).

I think it's been out for enough time now that a simple write-up is acceptable, but if you don't want any spoilers please stop here and enjoy the puzzle! But if you just want the solution or simply would like to know what the fuss is about, then read-on! 

**WARNING: SPOILERS BELOW**

## The Video and Binary
The video has some typical hacker stuff and a terminal that builds out binary code:
![IMAGE - derbycon-binary](/static/derbycon/derbycon-binary.png)

Taking the binary code, we can throw that into CyberChef and get the translation. Transcribing the binary from the video is probably the most annoying part from this challenge, so I've included the binary for you here:

`01111110 00101111 01110011 01100001 01010010 01101010 01001110 01101110 01110100 01101011 01110101 01111000`

![IMAGE - cyberchef-binary](/static/derbycon/cyberchef-binary.png)

This converts to: `~/saRjNntkux`

## Webpage
Now if you are familiar with Linux, you'll recognize `~/` as being a shortcut to the "home" directory for your current user. This doesn't actually help us with the challenge, but I like fun facts! 

Now if you poke around on their Twitter page a bit more, you'll see a link to their website (http://derbycon.com). But at this point you probably have browsed to their website at some point and noticed the very simple page that references the same base "home" directory.

![IMAGE - derbycon-page-root](/static/derbycon/derbycon-page-root.png)

Adding our converted string to the URL (http://derbycon.com/saRjNntkux/) reveals more stuff!

![IMAGE - derbycon-page-hashes](/static/derbycon/derbycon-page-hashes.png)

**Hashes:**
```
5da618e8e4b89c66fe86e32cdafde142  
63ad3072dc5472bb44c2c42ede26d90f  
9914a0ce04a7b7b6a8e39bec55064b82  
5d5194f75e03d194a3b75dd8aad29c2b  
  
  
aHR0cHM6Ly93d3cuZGVyYnljb24uY29tL2xsaWJxQW1oZkIuemlw
```

## Deciphering Hashes
Here it looks like we've got two types of hashes. A lot of write-ups or blog posts will usually say things like, "and that's obviously a base-64 (or something else) hash", but rarely do they talk about why it's so obvious, which is annoying... So let's take a look at one method of achieving this!

Let's go back into CyberChef. There's an "Analyze Hash" recipe that we can use to help guestimate what type of hash it is. It will use things like hash length and the types of characters to give a list of possible matches. 

![IMAGE - cyberchef-analyzehash-md5](/static/derbycon/cyberchef-analyzehash-md5.png)

The first result is MD5, which is a fairly common hashing algorithm, especially for CTF type challenges. The more you work in cyber security you'll start to recognize some of the patterns as well. An MD5 hash is represented by 32 hexadecimal characters (0-9 and A-F), which aligns with the first 4 strings that we have. 

The next problem is that cracking an MD5 hash can be hard... so we'll come back to this. Let's look at the next type of hash.

Another super cool thing that CyberChef can do is the "Magic" feature. It doesn't work all the time, but can be helpful for identifying simple stuff. When pasting our last string in, you may notice a little magic wand icon. Clicking it will automatically apply the correct recipe for the identified hash (in this case Base64) and decode.

![IMAGE - cyberchef-magic](/static/derbycon/cyberchef-magic.png)

Voila! We have decoded the hash which reveals a webpage: https://www.derbycon.com/llibqAmhfB.zip

When not using CyberChef, some characteristics about Base64 encoded strings:
- The length will always be a multiple of 4
- Characters used:
	- `a` through `z` (Uppercase and lowercase)
	- `0` through `9`
	- `+` and `/`
- The end of the string can also be padded with 1 or 2 equal signs (`=`). This is usually a clear giveaway when a random strings ends with a couple equal signs, but that only appears when the padding is necessary.

 ## Webpage - Part 2
 Since we have a link to a .zip file, let's go there next. However, when browsing to that page I got an error... I actually got stuck here for a few minutes trying to figure out what was wrong, initially assuming that the file was no longer available on their page.

![IMAGE - derbycon-page-error](/static/derbycon/derbycon-page-error.png)

However, I started looking at the certificate information and noticed it wasn't loading a certificate at all.

![IMAGE - derbycon-cert](/static/derbycon/derbycon-cert.png)

Looking back at the previous links, you can see we navigated to the page over HTTP instead of HTTPS. Since the end of conference announcement, I guess it makes sense not to keep maintaining the page's certificates... Changing the web address to HTTP (http://www.derbycon.com/llibqAmhfB.zip) worked and I successfully downloaded the .zip file!

However, when we try to unzip the file, we can see it's password protected. Looks like we are back to the MD5 hashes!

![IMAGE - password-protected](/static/derbycon/password-protected.png)

## Decrypting MD5 - Option 1 - hashcat
One option is decrypting the hashes yourself! This can be quick or take a lot of time depending on how complicated the string is. 

For this example I'll be using hashcat (https://hashcat.net/hashcat/). This comes pre-installed on Kali, but can easily be installed in any Linux environment.

First we need to create a file with the hashes:
![IMAGE - linux-hashes](/static/derbycon/linux-hashes.png)

Now we can run hashcat against the file:
`hashcat -m 0 hashes.txt /usr/share/wordlists/rockyou.txt`

**Command Options:**
- `-m 0` = Tells hashcat to use mode 0, which is MD5 [CHECK THIS]
- `hashes.txt` = The file with our hashes in it
- `rockyou.txt` = Specifies the wordlist to use

>Note: "rockyou.txt"
>- When cracking hashes or passwords, you need to specify a wordlist to use. The "rockyou" list contains over 14 million strings and is a common go-to for password cracking as it contains most of the commonly used words and passwords found from previous breaches.

>Note: "hashcat.potfile":
>- By default, hashcat will store all the cracked hashes in a file that can be read for later analysis. It also uses this file for efficiency and will check it when you run new jobs. 

Unfortunately when you run the above command, only two words are successfully cracked.

![IMAGE - hashcat-2](/static/derbycon/hashcat-2.png)

This is the problem with wordlists - not every iteration is going to exist. Since we can probably assume DerbyCon isn't going to make this incredibly challenging, let's try another wordlist. From doing directory enumeration, I know the medium wordlist from dirbuster contains a decent number of "stop" words not found in other lists.

`hashcat -m 0 hashes.txt /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`

Yay, we've got one more word: "From". 

![IMAGE - hashcat-3](/static/derbycon/hashcat-3.png)

I tried a few more wordlists from here with no luck before turning to Google. Auto-complete has the word "rises" which seems to most closely match a Star Wars quote (vaguely...). Let's manually check the MD5 hash using the same format:

`echo -n "Rises" | md5sum`

![IMAGE - md5sum](/static/derbycon/md5sum.png)

There it is! Now we have all four words: "From Darkness Light Rises".

## Decrypting MD5 - Option 2 - MD5 Hash Lookup
Fortunately, if you don't have access to a Linux environment (or would like a simpler option), there are websites available that maintain large databases with already cracked MD5 hashes. There are many options available, but for sake of example I used: https://md5.gromweb.com/

Pasting in each hash, you can see the resulting string:

![IMAGE - md5center](/static/derbycon/md5center.png)

So this way was a tad simpler, lol. But I think Option 1 was more fun!

## Unlocking the .zip 
Back to the .zip file, and the passcode works with no spaces! 

`FromDarknessLightRises`

It contains a .txt file with a link to YouTube: https://www.youtube.com/watch?v=RSsTx2TBrww

![IMAGE - contents](/static/derbycon/contents.png)

The result? Jack Johnson's song, Better Together. Personally I was hoping for some announcement of a new conference, but the challenge was fun all the same!

Enjoy reminiscing and stay safe out there! I hope you enjoyed the walkthrough. 