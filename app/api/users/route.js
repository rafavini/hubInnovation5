import { NextResponse } from 'next/server';
import path from 'path';
const dbPath = path.join(process.cwd(), 'app', 'api', 'db', 'database.db');
const db = require('better-sqlite3')(dbPath);

// CREATE - Adicionar um novo usuário
export async function POST(request) {
    try {
        const { name, age } = await request.json();
        const sql = `INSERT INTO users (name, age) VALUES (?, ?)`;
        const stmt = db.prepare(sql);
        stmt.run(name, age);
        return NextResponse.json({ message: 'Usuário adicionado com sucesso!' }, { status: 201 });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        return NextResponse.json({ error: 'Erro ao adicionar usuário' }, { status: 500 });
    }
}

// READ - Listar todos os usuários
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        if (id) {
            // Se um ID foi fornecido, busque um usuário específico
            const sql = 'SELECT * FROM users WHERE id = ?';
            const user = db.prepare(sql).get(id);

            if (!user) {
                return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
            }

            return NextResponse.json(user);
        } else {
            // Se nenhum ID foi fornecido, retorne todos os usuários
            const sql = 'SELECT * FROM users';
            const rows = db.prepare(sql).all();
            return NextResponse.json(rows);
        }
    } catch (error) {
        console.error('Erro ao buscar usuário(s):', error);
        return NextResponse.json({ error: 'Erro ao buscar usuário(s)' }, { status: 500 });
    }
}

// UPDATE - Atualizar um usuário por ID
export async function PUT(request) {
    try {
        const { id, name, age } = await request.json();
        const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;
        const stmt = db.prepare(sql);
        const result = stmt.run(name, age, id);
        if (result.changes === 0) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Usuário atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 });
    }
}

// DELETE - Deletar um usuário por ID
export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const sql = `DELETE FROM users WHERE id = ?`;
        const stmt = db.prepare(sql);
        const result = stmt.run(id);
        if (result.changes === 0) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
    }
}
