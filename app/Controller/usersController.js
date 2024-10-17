

export async function GetAllUsers(){
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}


export async function AddUsers(name,age) {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age: parseInt(age, 10) }),
        });
        return response;
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    }
    
}