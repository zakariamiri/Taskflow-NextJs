import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDB(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ✅ DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 🔥 IMPORTANT

  const db = readDB();

  db.projects = db.projects.filter((p: any) => p.id !== id);

  writeDB(db);

  return NextResponse.json({ success: true });
}

// ✅ PUT (rename)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // 🔥 IMPORTANT
  const body = await req.json();

  const db = readDB();

  const index = db.projects.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.projects[index] = {
    ...db.projects[index],
    ...body,
  };

  writeDB(db);

  return NextResponse.json(db.projects[index]);
}