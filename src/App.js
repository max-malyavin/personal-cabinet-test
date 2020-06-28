import React, { useState, useEffect } from 'react';
import './App.scss';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { Route } from 'react-router-dom';
import Preloader from './Components/Preloader/Preloader';
import { authAPI } from './Components/Api/Api';

function App() {

  const [state, setState] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    authAPI.me().then((data)=> setState(data))
 }, [])


  const login = (username, password) => {
      authAPI.login(username,password).then((data)=> {
        if(typeof String){
          setFailed(true)
        }
        setState(data)
      }) 
  }

  const logout = () => {
      authAPI.logout().then((data)=>{
        setState(data)
        setFailed(false)
      })
   }
  
  return (
    <div className="app">

      {state ? <React.Fragment>

        {state.isAuth && <React.Fragment>
            <Route path="/" render= { () => <Home logout={logout} state={state}/> }/>
          </React.Fragment>
        }

      {!state.isAuth && <Route path="/" render= { () =>  <Login failed={failed} login={login}/> }/>}

     </React.Fragment>

     :  <>
     <h1 style={{textAlign: 'center'}}>Запустите пожалуйста json-server</h1>
     <h1>В новом терминале пропишите:  json-server ./src/db.json --watch --port 3001</h1>
     <Preloader/>
     </>}

    </div>
  );
}

export default App;
