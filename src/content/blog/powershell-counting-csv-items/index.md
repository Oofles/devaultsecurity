---
title: "PowerShell - Counting Items in a CSV"
summary: "How to count unique items in a CSV."
date: "2020-08-29"
tags:
- PowerShell
- Scripting
- Security Operations
draft: false
---

## Problem?
I needed to get a unique count of items in a CSV file. Specifically, this was part of converting a CSV to JSON. PowerShell actually makes this pretty simple, but there are a few considerations in the code.

### TL/DR - The Function
I'll go on to explain each of these pieces in more detail, but if you are just here for the code, enjoy!

```powershell
$import = Import-Csv /path/to/file.csv

function countUnique ($column_name) {
    $stats = $import.$column_name | Sort-Object | Get-Unique | Measure-Object
    $count = $stats.Count - 1 # Only necessary if accounting for blank lines, otherwise remove "- 1"
    return $count
}

$value = countUnique("column_name")
```

## Import
Let's start by importing the CSV file. PowerShell will convert all the data into a PS Object making it much easier to manipulate.

We will assign this value to a variable so we can use the data later on.

```powershell
$import = Import-Csv /path/to/file.csv
```

## Referencing the Column or Field name
The header in a CSV file will be converted into the field names for each of the PowerShell objects. For instance, let's use this CSV file as an example:

```csv
id,first,last,classification
1,darth,vader,sith
2,baby,yoda,unknown
3,luke,skywalker,jedi
4,obi-wan,kenobi,jedi
5,darth,bane,sith
```

If we wanted to reference all the values in "classification", we could output `$import.classification` and our output would look like:

```
sith
unknown
jedi
jedi
sith
```

## Getting unique values
Thankfully, PowerShell has a cmdlet called `Get-Unique` which makes this super simple! The problem is we can't use this by itself if we truly want only unique values. As an test, let's take a look at our previous example:

```powershell
ps > $import.classification | Get-Unique

sith
unknown
jedi
sith
```

Even though we wanted unique values, "sith" actually shows up twice... Why did this happen? Well, `Get-Unique` will extract unique values using a top-down approach. This works the same way as the Linux command: `uniq`. So we solve this by sorting the values first with the `Sort-Object` cmdlet.

```powershell
ps > $import.classification | Sort-Object | Get-Unique

jedi
unknown
sith
```

## Counting values
Great! So now we have unique values, how do we count them? Let's use another useful cmdlet, `Measure-Object`. This will give us some useful statistics (count, average, sum, maximum, and minimum). For strings, the only really useful stat is "count" which is exactly what we need!

We'll take everything we've done before, and assign it all to a variable. Then we can call the variable.count to return just the count number.

```powershell
$stats = $import.classification | Sort-Object | Get-Unique | Measure-Object

$stats.Count
```

Using our example, `$stats.Count` should now be equal to 3.

Another consideration is if you have blank values in your CSV file. There are a few different ways to manage this, but the simplest would be to subtract your final count value by 1.

```powershell
$count = $stats.Count - 1
```

## The Solution

### Simplified Code
Ok, let's bring it all together. If you just need to perform this action once, here's the simple code:

```powershell
$import = Import-Csv /path/to/file.csv
$stats = $import.column_name | Sort-Object | Get-Unique | Measure-Object
$count = $stats.Count - 1 # Only necessary if accounting for blank lines, otherwise just remove "- 1"
```

Make sure to replace `column_name` with the value of your desired column name. Now you can use the `$count` variable which will be the unique value of the desired column.

### Function
If you'll need to perform this action more than once, you should probably functionize it! (I'm not sure if that's a real word...)

We'll start by created a global variable for the imported file - you don't want this to be inside your function in case you need to manipulate the data in other functions.

Within the function, we'll add the ability to pass in data via the `$column_name` variable. We'll also need to return a value ouside of the function, and we can do that with `return $count`.

```powershell
$import = Import-Csv /path/to/file.csv

function countUnique ($column_name) {
    $stats = $import.$column_name | Sort-Object | Get-Unique | Measure-Object
    $count = $stats.Count - 1 # Only necessary if accounting for blank lines, otherwise remove "- 1"
    return $count
}

$value = countUnique("column_name")
```

In this case, you'll need to replace `"column_name"` with the value of your desired column name.

Congratulations! Now you've got a way to count unique values in a CSV!

#### Additional Resources

* [My PowerShell Scripts on GitHub](https://github.com/Oofles/PowerShell-Scripts)
* [Microsoft PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/?view=powershell-7)
