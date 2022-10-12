import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";
import './app.css';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const handleLimpar = () => {
    setCep({});
    setInput('');
  }

  async function handleSearch() {
    if(input !== "") {
      try {
        const response = await api.get(`${input}/json`);
        setCep(response.data);
        setInput('');

      } catch {
        alert("Algo deu errado! Tente novamente");
        setInput('');
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
        type="text" 
        placeholder="Digite o CEP..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleSearch} className="botaoBuscar">
        <FiSearch size={25} color="black"/></button>
      </div>
      {Object.keys(cep).length > 0 &&
      <div className="resultado">
      <div className="containerBusca">
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro} - {cep.localidade}, {cep.uf}</span>
      </div>
      <button onClick={handleLimpar} className="botaoLimpar"> Limpar </button>
      </div>
      }
    </div>
  );
}

export default App;
