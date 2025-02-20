import { useState } from "react";
import axios from "axios";

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const [error, setError] = useState('');
    
    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/auth/login', 
                JSON.stringify({email, password}),
                {
                    headers: { 'Content-Type': 'application/json'}
                }
            );

            console.log(response.data);

            setUser(response.data);

        } catch (error) {
            if(!error?.response){
                setError('Erro ao acessar o servidor');
            } else if(error.response.status == 404){
                setError('Usuário ou senha inválidos');
            }
        }
        
    };

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
                <h2> Olá, {user.name}</h2>

                <button type="button" className=""></button>
            </div>
    )}
        </div>
      </>
    );
}

export default Login;