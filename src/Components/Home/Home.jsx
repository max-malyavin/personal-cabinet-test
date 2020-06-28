import React, { useState, useEffect } from 'react'
import '../../App.scss'
import List from '../List/List'
import Contacts from '../Contacts/Contacts';
import { Route } from 'react-router-dom';
import Favourites from '../Favourites/Favourites';
import BlockedContacts from '../BlockedContacts/BlockedContacts';
import Preloader from '../Preloader/Preloader';
import { contactsAPI } from '../Api/Api';
import { Button } from 'antd';


const Home = ({state,logout}) => {
    
    const [data, setData] = useState([])
  

    const CountContacts = data && [
        data.length || 0,
        data.filter(item=>item.favorites).length || 0 ,
        data.filter(item=>item.blocked).length || 0 ]
 

    const onRemove = (id)=> {
        contactsAPI.delete(id).then(({status})=> {
            if(status === 200){
                setData(data.filter(item=> item.id !== id))
            }
        })
    }

    const onEdit = (id,number,username,Email)=> {
        contactsAPI.Edit(id,username,Email,number).then(()=> {
            contactsAPI.getContacts().then((data)=> {
                setData(data)
           })
        })

    }
    useEffect(() => {
        contactsAPI.getContacts().then((data)=> {
            setData(data)
       })
    }, [])

    const onFavorite = (id)=> {
        const favotire = data.find(item=> {
            if(item.id == id){
                item.favorites = item.favorites && false || !item.favorites && true
                return item
            }
        })
        const favotireItem = favotire.favorites
        contactsAPI.favotire(id,favotireItem).then(({status})=> {
            if(status === 200){
                setData([...data])
            }
        })
    }
    const onBlocked = (id)=> {
        const blockedI = data.find(item=> {
            if(item.id == id){
                item.blocked = item.blocked && false || !item.blocked && true
                return item
            }
        })
        const blockedItem = blockedI.blocked
        contactsAPI.blocked(id,blockedItem).then(({status})=> {
            if(status === 200){
                setData([...data])
            }
        })
    }

    return (
        <div className='home'>
            <div className="home__sidebar">
                <div className="home__login">
                  <div>Логин: <span className='login-header'>{state.login && state.login} </span></div>
                    <Button onClick={logout} type="primary">Выйти</Button>
                </div>
             { data.length ? <List CountContacts={CountContacts}
              items={["Контакты", "Избранные","Заблокированные"]
              }/> : <Preloader/>
              }
                <div className="copy">
                © 2020. Malyavin
                </div>
            </div>
            <div className="home__contacts">
              <div className="block__contacts">

            {data.length 
            ? <React.Fragment>

                <Route exact path="/" render= { () => <Contacts 
                onFavorite={onFavorite} onEdit={onEdit}
                onBlocked={onBlocked}  onRemove={onRemove} 
                setData={setData} data={data}/> }/>

                <Route exact path="/favourites" render= { () => <Favourites 
                 onRemove={onRemove}  onFavorite={onFavorite} data={data}/> }/>

                <Route exact path="/blocked" render= { () => <BlockedContacts 
                onRemove={onRemove} onBlocked={onBlocked}  data={data}/> }/>

              </React.Fragment>

            : <Preloader/>}

                </div>
            </div>
        </div>
    )
}

export default Home
