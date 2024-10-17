// app/page.js
"use client"
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    // Função para buscar todos os usuários
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para adicionar um novo usuário
    const addUser = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, age: parseInt(age, 10) }),
            });
            if (response.ok) {
                setName('');
                setAge('');
                fetchUsers();
            }
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
        }
    };

    // Função para atualizar um usuário
    const updateUser = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: editingUser.id, name, age: parseInt(age, 10) }),
            });
            if (response.ok) {
                setName('');
                setAge('');
                setEditingUser(null);
                fetchUsers();
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    // Função para deletar um usuário
    const deleteUser = async (id) => {
        try {
            const response = await fetch('/api/users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    // Lida com o envio do formulário (adicionar ou atualizar)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            updateUser();
        } else {
            addUser();
        }
    };

    // Preenche os campos para edição
    const handleEdit = (user) => {
        setEditingUser(user);
        setName(user.name);
        setAge(user.age.toString());
    };

    // Carrega os usuários na inicialização
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Gerenciamento de Usuários</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                <button type="submit">{editingUser ? 'Atualizar' : 'Adicionar'} Usuário</button>
                {editingUser && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingUser(null);
                            setName('');
                            setAge('');
                        }}
                    >
                        Cancelar Edição
                    </button>
                )}
            </form>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.age} anos
                        <button onClick={() => handleEdit(user)}>Editar</button>
                        <button onClick={() => deleteUser(user.id)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
