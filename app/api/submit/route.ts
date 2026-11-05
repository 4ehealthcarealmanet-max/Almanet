import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwiilgEDUUZawFK-IQb7DnSuqUMPnqiRKFw0D4GX9TwnzjNaYGkIsJhStp_u6CexI8/exec';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'almanet_submissions.xlsx');

function saveWorkbook(wb: XLSX.WorkBook) {
  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  fs.writeFileSync(FILE_PATH, buf);
}

function ensureWorkbook(): XLSX.WorkBook {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let wb: XLSX.WorkBook;
  let isNew = false;
  if (fs.existsSync(FILE_PATH)) {
    try {
      wb = XLSX.read(fs.readFileSync(FILE_PATH), { type: 'buffer' });
    } catch {
      wb = XLSX.utils.book_new();
      isNew = true;
    }
  } else {
    wb = XLSX.utils.book_new();
    isNew = true;
  }

  const defaultTabs: Record<string, string[]> = {
    Inquiries: ['Timestamp', 'Full Name', 'Email', 'Phone', 'Primary Interest', 'Message'],
    Events: ['Timestamp', 'Event Title', 'Event Date', 'Full Name', 'Email', 'Phone', 'Organization', 'Interest', 'Questions'],
    Careers: ['Timestamp', 'Job Title', 'Full Name', 'Email', 'Phone', 'Portfolio / LinkedIn', 'Cover Note'],
  };

  let modified = isNew;
  for (const [tab, headers] of Object.entries(defaultTabs)) {
    if (!wb.SheetNames.includes(tab)) {
      const ws = XLSX.utils.aoa_to_sheet([headers]);
      XLSX.utils.book_append_sheet(wb, ws, tab);
      modified = true;
    }
  }

  if (modified) {
    saveWorkbook(wb);
  }

  return wb;
}

function appendToXlsx(tab: string, rowData: (string | number)[]) {
  const wb = ensureWorkbook();
  const ws = wb.Sheets[tab];
  if (!ws) return;

  XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
  saveWorkbook(wb);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tab = 'Inquiries' } = body;
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    let rowData: (string | number)[] = [];
    if (tab === 'Inquiries') {
      rowData = [
        now,
        body.fullName || '',
        body.email || '',
        body.phone || '',
        body.interest || '',
        body.message || '',
      ];
    } else if (tab === 'Events') {
      rowData = [
        now,
        body.eventTitle || '',
        body.eventDate || '',
        body.fullName || '',
        body.email || '',
        body.phone || '',
        body.organization || '',
        body.interest || '',
        body.questions || '',
      ];
    } else if (tab === 'Careers') {
      rowData = [
        now,
        body.jobTitle || '',
        body.fullName || '',
        body.email || '',
        body.phone || '',
        body.portfolio || '',
        body.coverNote || '',
      ];
    }

    // 1. Save directly into local multi-tab Excel file (.xlsx)
    try {
      appendToXlsx(tab, rowData);
    } catch (err) {
      console.error('Error writing to local XLSX:', err);
    }

    // 2. Also forward to Google Sheets Apps Script Webhook
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        redirect: 'follow',
      });
    } catch (err) {
      console.warn('Google Sheets Webhook note (saved in local Excel):', err);
    }

    return NextResponse.json({ success: true, message: 'Saved successfully to Excel and Google Sheets' });
  } catch (error: any) {
    console.error('Submission API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
