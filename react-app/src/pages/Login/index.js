import React from 'react';
import { Container, TextField } from "../../Components"

function Page() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [err, setErr] = React.useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (localStorage.getItem(email) === password) {
      localStorage.setItem("logado", "true");
      window.location = "/dashboard"
    } else {
      setErr("Usuário ou senha inválidos")
    }
    // axios.post (url/data/config)
  }

  React.useEffect(() => {
    if (localStorage.getItem("logado") === "true") {
      window.location = "/dashboard"
    }
  }, [])
    
  return (
    <Container className="centered h-100">
      <div className="bg-white white-div-1 text-center">
        <h4 className="text-center mb-5">Entrar</h4>
        <form>
          <TextField
            variant="1"
            placeholder="Usuário"
            onChange={setEmail}
          />
          <TextField
            variant="1"
            placeholder="Senha"
            onChange={setPassword}
            type="password"
          />
          <p style={{color: 'red'}}>{err}</p>
        </form>
        <button
          className="btn btn-black w-100 mt-4 mb-3"
          onClick={handleLogin}
        >
          Entrar
        </button>
        <p className="d-inline text-small">Ainda não tem uma conta? </p>
        <a
          className="d-inline text-small font-weight-bold a-black"
          href="/cadastro"
        >
          Cadastre-se aqui.
        </a>
      </div>
    </Container>
  );
}

export default Page;