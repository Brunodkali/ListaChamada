import './style.css'

import { Card } from '../../components/Card';
import { useState, useEffect } from 'react';

function Home() {

  const [companyName, setCompanyName] = useState("");
  const [company, setCompany] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddCompany() {
    const newCompany = {
      name: companyName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
      })
    };

    setCompany(state =>[...state, newCompany]);
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/Brunodkali')
      const data = await response.json()
      setUser ({
        name: data.name,
        avatar: data.avatar_url,
      })
    }

    fetchData();
  }, [])

  return (
    <div className='container'>

      <header>
        <h1>Lista de chamada</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil"/>
        </div>
      </header>
    
      <input type="text" placeholder="Digite aqui o nome do aluno..." onChange={(e) => setCompanyName(e.target.value)}></input>
      <button type="button" onClick={handleAddCompany}>Adicionar</button>
{
      company.map(company => (
        <Card 
        key={company.name}
        name={company.name} 
        time={company.time}/>
        ))
}
    </div>
  )
}

export default Home;
