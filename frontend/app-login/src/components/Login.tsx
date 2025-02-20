import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface User {
    name: string;
    email: string;
    password: string;
}

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const [error, setError] = useState('');
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response: AxiosResponse<{ data: User }> = await axios.post('http://localhost:3000/auth/login', 
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            );

            console.log(response.data);

            setUser(response.data.data);

        } catch (error) {
            if(!error?.response){
                setError('Erro ao acessar o servidor');
            } else if(error.response.status == 404){
                setError('Usuário ou senha inválidos');
            }
        }
        
    };

    const handleLogout = () =>{
        setUser(null);
    }

    return (
      <>
        <div className='login-form-wrap'>
            {user === null ? (
            <div>
                <h2> Login </h2>

                <form className='login-form'>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                    
                    <input type="password" name="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className='btn-login' onClick={(e) => handleLogin(e)}> Entrar </button>
                </form>

                <p>{error}</p>
            </div>
    ) : (
            <div>
                <h2>Olá, {user?.name || "Usuário sem nome"}</h2> 

                <button type="button" className="btn-login" onClick={handleLogout}> Voltar </button>
            </div>
    )}
        </div>
      </>
    );
}

export default Login;