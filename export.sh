#!/bin/sh

# First remove the old export if it exists
rm ./pubic.tar.gz

# Build site files
hugo -D

# Compress all in public
tar -czvf public.tar.gz ./public/
