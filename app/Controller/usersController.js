

export async function GetAllUsers(){
    const response = await fetch('/api/users');
    const dados = await response.json();
    return dados;
}