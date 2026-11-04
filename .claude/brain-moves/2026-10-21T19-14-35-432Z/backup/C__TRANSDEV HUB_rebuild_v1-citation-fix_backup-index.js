// Read-only full backup of every chunk (fields + vectors) of the live v1 index, for rollback before any index surgery.
const fs=require('fs'),{execFileSync}=require('child_process');
const env=fs.readFileSync('../../.env','utf8');const KEY=env.match(/primary admin key:\s*(\S+)/i)[1];
const EP=env.match(/^AZURE_SEARCH_ENDPOINT=(\S+)/m)[1],IDX=env.match(/^AZURE_SEARCH_INDEX=(\S+)/m)[1];
const q=b=>JSON.parse(execFileSync('curl',['-s','--ssl-no-revoke','-H','api-key: '+KEY,'-H','Content-Type: application/json','--data-binary','@-',`${EP}/indexes/${IDX}/docs/search?api-version=2024-07-01`],{input:JSON.stringify(b),maxBuffer:1<<29}).toString());
let all=[];for(let s=0;s<2250;s+=250){const r=q({search:'*',top:250,skip:s,orderby:'content_id asc'});if(!r.value)throw new Error(JSON.stringify(r).slice(0,200));all=all.concat(r.value)}
const ids=new Set(all.map(d=>d.content_id));const withVec=all.filter(d=>Array.isArray(d.content_embedding)&&d.content_embedding.length===1536).length;
fs.writeFileSync('backup/index-v1-docs-2026-10-06.json',JSON.stringify(all));
console.log('docs',all.length,'unique',ids.size,'with 1536-d vector',withVec,'bytes',fs.statSync('backup/index-v1-docs-2026-10-06.json').size);
