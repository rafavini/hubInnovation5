import { NextResponse } from 'next/server';
import path from 'path';
const dbPath = path.join(process.cwd(), 'app', 'api', 'db', 'database.db');
const db = require('better-sqlite3')(dbPath);

export async function POST(request) {
    try {
        const { usuario, senha } = await request.json();
        const sql = `SELECT * FROM USERS WHERE name = ? AND password = ?`;
        const user = db.prepare(sql).get(usuario,senha);

        if (!user) {
            const sql = `INSERT INTO USERS (name,password) VALUES(?,?)`;
            const stmt = db.prepare(sql);
            stmt.run(usuario, senha);
        }
        return NextResponse.json({ error: "" }, { status: 200 });
    } catch (error) {
        console.error('Erro no login:', error);
        return NextResponse.json({ error: 'Erro no login' }, { status: 500 });
    }
}