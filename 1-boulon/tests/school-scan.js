const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const root=process.argv[2],out=process.argv[3];
const re=/autobus\s+scolaires?|school\s*-?\s*bus(es)?|schoolbus|scolaires?|transport\s+d.[ée]l[èe]ves|student\s+transport|eLion|LionC\b|Saf-?T-?Liner|Blue\s*Bird|Thomas\s+Built|Micro\s*Bird|IC\s+Bus|PB105|\bVision\b/gi;
const files=[];(function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())w(p);else if(/\.pdf$/i.test(e.name))files.push(p);}})(root);
const done=new Set(fs.existsSync(out)?fs.readFileSync(out,"utf8").split(/\r?\n/).filter(Boolean).map(l=>JSON.parse(l).p):[]);console.log("already",done.size);let n=0;console.log('files',files.length);
for(const f of files){if(done.has(path.relative(root,f).split(path.sep).join("/")))continue;let txt='',err=0;try{txt=execFileSync('pdftotext',['-q',f,'-'],{maxBuffer:1<<30,timeout:180000}).toString();}catch(e){err=1;}
const hits={};let m;while((m=re.exec(txt))){const k=m[0].toLowerCase().replace(/\s+/g,' ');hits[k]=(hits[k]||0)+1;}
fs.appendFileSync(out,JSON.stringify({p:path.relative(root,f).split(path.sep).join('/'),bytes:fs.statSync(f).size,chars:txt.length,err,hits})+'\n');if(++n%100==0)console.log('done',n);}

