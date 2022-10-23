import { useState } from "react";
import HeaderComp from "../../components/Header";
import ItemList from "../../components/ItemList";
import background from "../../assets/images/github-logo.png";
import "./styles.css";

function App() {

  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
debugger
    if( newUser.login ){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if( newRepos.length ){
        setRepos(newRepos);
      }
    }
    //console.log(newUser);
  }

  return (
    <div className="App">
      <HeaderComp texto={"GitFind"} />
      <div className="conteudo">
        {/*<img src={background} alt="" className="background" />*/}
        <img src={background} alt="" className="background" />
        <div className="info">
          <input
            name="usuario"
            placeholder="@username"
            onChange={(event) => setUser(event.target.value)}
            value={user}
          ></input>
          <button onClick={handleGetData}>Buscar</button>

          {(currentUser?.name || currentUser?.login) ? (
            <>
              <div className="profile">
                <img
                  src={currentUser.avatar_url}
                  alt="Imagem do Perfil"
                  className="imageProfile"
                />
                <div className="profileDesc">
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
          <div>
            <h4 className="repositorio">Repositórios</h4>
            {repos.map((repo) => (
              <ItemList title={repo.name} description={repo.description} />
            )) }
          </div>
          ): null}          
        </div>
      </div>
    </div>
  );
}

export default App;
