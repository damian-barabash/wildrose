#!/bin/sh
# podgląd slajdów do kontroli: brand/preview.sh <katalog>
out=${1:-/tmp/wr-deck}; rm -rf "$out"; mkdir -p "$out"
pdftoppm -r 60 -png "$(dirname "$0")/Wild-Roses-Logo-Propozycje.pdf" "$out/s" 2>/dev/null
node -e '
const sharp=require("'"$(cd "$(dirname "$0")/.." && pwd)"'/node_modules/sharp");const fs=require("fs");const d=process.argv[1];
(async()=>{const f=fs.readdirSync(d).filter(x=>x.startsWith("s-")).sort();
for(let k=0;k<f.length;k+=4){const g=f.slice(k,k+4);const parts=g.map((x,i)=>({input:d+"/"+x,left:(i%2)*908,top:Math.floor(i/2)*514}));
await sharp({create:{width:1808,height:g.length>2?1020:506,channels:3,background:"#444"}}).composite(parts).jpeg({quality:84}).toFile(d+"/m"+(k/4)+".jpg")}})()' "$out"
