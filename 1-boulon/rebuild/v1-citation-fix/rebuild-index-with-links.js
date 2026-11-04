// BOULON v1 in-place rebuild (prepared 2026-10-06). Fixes the citation link without Basic by recreating the SAME index:
// the Free service refuses writes (storage 77 MB of 50 MB, mostly dead space from my 3 merge passes). Deleting and recreating the index
// frees it; the data is restored from backup/index-v1-docs-2026-10-06.json with title = "short name, p. N" and url = SharePoint link#page=N.
//   node rebuild-index-with-links.js plan    -> read-only: builds everything, checks it, prints a report. Writes nothing to Azure.
//   node rebuild-index-with-links.js apply   -> needs AZURE_OPENAI_KEY in ../../../.env (Greg pastes it). Deletes + recreates + uploads + verifies.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const mode=process.argv[2]||'plan';
const env=fs.readFileSync('../../../.env','utf8');
const KEY=env.match(/primary admin key:\s*(\S+)/i)[1],EP=env.match(/^AZURE_SEARCH_ENDPOINT=(\S+)/m)[1],IDX=env.match(/^AZURE_SEARCH_INDEX=(\S+)/m)[1];
const AOAI=(env.match(/^AZURE_OPENAI_KEY\s*=\s*(\S+)/m)||[])[1];
const API='api-version=2024-07-01';
const map=JSON.parse(fs.readFileSync('citation-map.json','utf8'));
const docs=JSON.parse(fs.readFileSync('backup/index-v1-docs-2026-10-06.json','utf8'));
const local='C:/Users/rilg01/OneDrive - TRANSDEV/Manuels/';
function call(method,url,body){const a=['-s','--ssl-no-revoke','-X',method,'-H','api-key: '+KEY,'-H','Content-Type: application/json','-w','\n%{http_code}',url];if(body!==undefined)a.push('--data-binary','@-');
  const o=execFileSync('curl',a,{input:body===undefined?undefined:JSON.stringify(body),maxBuffer:1<<29}).toString();const i=o.lastIndexOf('\n');const t=o.slice(0,i);return{code:+o.slice(i+1),json:t?JSON.parse(t):null}}
const link=(f,page)=>{const e=map.files[f];if(!e)throw new Error('no map entry for '+f);
  return map.spBase+e.folder.split('/').filter(Boolean).map(encodeURIComponent).join('/')+'/'+encodeURIComponent(e.file||f)+'#page='+page};
const label=(f,page)=>map.files[f].short+', p. '+page;
const out=docs.map(d=>{const p=d.locationMetadata&&d.locationMetadata.pageNumber;const n={...d};delete n['@search.score'];delete n['@search.rerankerScore'];delete n.metadata_storage_path;
  n.title=label(d.document_title,p);n.url=link(d.document_title,p);return n});
// checks
const files=[...new Set(docs.map(d=>d.document_title))];let missing=[];
for(const f of files){const e=map.files[f];if(!e){missing.push(f+' (no map entry)');continue}if(!fs.existsSync(local+e.folder+(e.file||f)))missing.push(f+' (not on disk: '+e.folder+')')}
const maxLabel=Math.max(...out.map(d=>d.title.length));const added=out.reduce((s,d)=>s+d.title.length+d.url.length,0);
console.log('docs',out.length,'| manuals',files.length,'| longest label',maxLabel,'chars | added bytes of new fields ~',added,'| missing/unverified:',missing.length?missing:'none');
for(const f of files.slice(0,4)){const d=out.find(x=>x.document_title===f);console.log(' ',d.title,'|',d.url)}
const def=JSON.parse(fs.readFileSync('index-v1-definition-BEFORE-2026-10-06.json','utf8'));delete def['@odata.context'];delete def['@odata.etag'];
def.fields.push({name:'title',type:'Edm.String',searchable:true,filterable:false,retrievable:true,sortable:false,facetable:false},{name:'url',type:'Edm.String',searchable:false,filterable:false,retrievable:true,sortable:false,facetable:false});
console.log('new definition fields:',def.fields.map(f=>f.name).join(','),'| vectorizer key present:',!!AOAI);
if(mode!=='apply'){console.log('PLAN ONLY. Nothing sent to Azure.');process.exit(0)}
if(!AOAI||AOAI.length<20){console.error('Stop: AZURE_OPENAI_KEY missing in .env (Greg pastes the boulon-pilot-ai key). Nothing changed.');process.exit(2)}
def.vectorSearch.vectorizers.forEach(v=>{v.azureOpenAIParameters.apiKey=AOAI});
if(process.argv[3]!=='upload-only'){let r=call('DELETE',`${EP}/indexes/${IDX}?${API}`);console.log('DELETE index ->',r.code);if(r.code>=300&&r.code!==404)process.exit(1);
r=call('PUT',`${EP}/indexes/${IDX}?${API}`,def);console.log('CREATE index ->',r.code);if(r.code>=300){console.log(JSON.stringify(r.json).slice(0,400));process.exit(1)}}
let ok=0,bad=0;for(let i=0;i<out.length;i+=100){const b=out.slice(i,i+100).map(d=>({'@search.action':'upload',...d}));const x=call('POST',`${EP}/indexes/${IDX}/docs/index?${API}`,{value:b});
  if(x.json&&x.json.value)for(const v of x.json.value)v.status?ok++:(bad++,console.log('fail',v.errorMessage));else{bad+=b.length;console.log('batch error',x.code,JSON.stringify(x.json).slice(0,200))}}
console.log('upload done:',ok,'ok',bad,'failed');
