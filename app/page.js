"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VerificaLogin } from "./Controller/loginController";

export default function LoginPage() {
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")
    const router = useRouter()


    async function handleSubmit(event) {
        event.preventDefault()
        const response = await VerificaLogin(usuario,senha)
        if(response){
            router.push("/home")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center w-full h-screen">
                <div className="w-80 bg-slate-600 p-6 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="block text-white mb-1">Usuário</label>
                            <input
                                type="text"
                                placeholder="Digite o usuário"
                                className="w-full px-3 py-2 bg-gray-200 rounded  "
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="block text-white mb-1">Senha</label>
                            <input
                                type="password"
                                placeholder="Digite a senha"
                                className="w-full px-3 py-2 bg-gray-200 rounded"
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
