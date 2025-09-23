#!/bin/bash
find . -maxdepth 1 ! -name ".*" \( -type f -o -type d \) | wc -1