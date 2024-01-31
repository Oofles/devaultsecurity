---
title: "NCL - OSINT - Meta (Easy)"
linkTitle: "ncl-osint-meta"
date: 2024-01-30
description: >
  NCL - OSINT - Meta (Easy)
---

# Meta (Easy)

This section has a downloadable image (Meta.jpg) and asks about some of the metadata. Most of the information can be found by simply looking at the properties (Right Click -> Properties) and then going to the "Details" tab.

![image](/static/ncl/meta.png)


Q1: When was the image created? Round down to the nearest minute

A: `May 15th, 2015 2:14am`

Q2: What are the dimensions of the image? (ex: 800x600)

A: `1024x768`

Q3: What is the make of the camera that took the picture?

A: `Apple`

Q4: What is the model of the camera that took the picture?

A: `Apple iPhone 5`

Q5: What is the exposure time for the picture? (ex: 1/200)

A: `1/640`

Q6: What are the GPS coordinates where the was the picture taken? (Any standard format is acceptable)

A: `39.875, 20.01`

This one game me a little trouble. I initially submitted in Degrees, Minutes, Seconds (DMS) format: `39°52'30"N, 20°00'36"E` but the system didn't like this... So, I converted it into decimal degrees (DD) and that worked. 

The math:

- DD=degrees+(minutes/60)+(seconds/3600)

Or, I've got a simple Python script so you can replicate!

```python
# Conversion from DMS to Decimal Degrees
def dms_to_dd(degrees, minutes, seconds):
    return degrees + (minutes/60) + (seconds/3600)

# Provided coordinates
lat_dms = (39, 52, 30)  # Latitude in DMS
long_dms = (20, 0, 36)  # Longitude in DMS

# Convert to Decimal Degrees
lat_dd = dms_to_dd(*lat_dms)
long_dd = dms_to_dd(*long_dms)

print("Latitude in DD:", lat_dd)
print("Longitude in DD:", long_dd)

label = "Combined:"
print(label + ' ' + str(lat_dd), long_dd, sep=', ')
```