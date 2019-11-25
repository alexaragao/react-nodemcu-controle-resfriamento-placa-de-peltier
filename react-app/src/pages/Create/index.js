import React from 'react';
import { Container, TextField } from "../../Components"

function Page() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  function handleCreate(e) {
    e.preventDefault();

    localStorage.setItem(email, password);
    window.location = "/"
  }
    
  return (
    <Container className="centered h-100">
      <div className="bg-white white-div-1 text-center">
        <h4 className="text-center mb-5">Criar conta</h4>
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
        </form>
        <button
          className="btn btn-black w-100 mt-4 mb-3"
          onClick={handleCreate}
        >
          Cadastrar
        </button>
        <p className="d-inline text-small">Já tem uma conta? </p>
        <a
          className="d-inline text-small font-weight-bold a-black"
          href="/"
        >
          Entre aqui.
        </a>
      </div>
    </Container>
  );
}

export default Page;