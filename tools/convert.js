#!/usr/bin/env node
/*
  Conversion script: XLSX -> data/schedule.json
  Usage: node v2/tools/convert.js "Midterm Exam Schedule.xlsx"
*/

const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function trim(v){ return (v==null?'':String(v)).trim(); }

function main(){
  const inputPath = process.argv[2] || 'Midterm Exam Schedule.xlsx';
  if(!fs.existsSync(inputPath)){
    console.error('Input XLSX not found:', inputPath);
    process.exit(1);
  }
  const wb = xlsx.readFile(inputPath, { cellDates: false, cellNF: false, cellText: false });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(ws, { defval: '' });

  // Attempt to map columns by common headings
  // Ensure you keep subjects in English as provided
  const out = [];
  for(const r of rows){
    // Heuristics for possible column names from provided sheet
    const code = r.Code || r.code || r.CODE || r["Course Code"] || r["رمز المقرر"] || r["رمز"] || '';
    const date = r.Date || r.date || r.DATE || r["التاريخ"] || '';
    const time = r.Time || r.time || r.TIME || r["الوقت"] || '';

    if(!trim(code) && !trim(date)) continue;
    // Map time to session code when matches known windows
    const normalizedTime = trim(time);
    const session = (
      normalizedTime === '4:00 PM – 5:00 PM' ? 'S1' :
      normalizedTime === '5:30 PM – 6:30 PM' ? 'S2' :
      normalizedTime === '7:00 PM – 8:00 PM' ? 'S3' :
      normalizedTime === '8:30 PM – 9:30 PM' ? 'S4' : ''
    );

    out.push({
      code: trim(code),
      date: trim(date),
      session
    });
  }

  const outDir = path.join(__dirname, '..', 'data');
  if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'schedule.json');
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote', out.length, 'rows to', outPath);
}

main();


