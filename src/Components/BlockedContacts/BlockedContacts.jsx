import React, { useState, useEffect } from 'react'
import { List, Avatar, Card,Input } from 'antd'
import classNames from 'classnames';
import {  LockOutlined, CloseOutlined } from '@ant-design/icons'
import { showConfirm } from '../Common/helpers';
const { Search } = Input;
const BlockedContacts = ({data,onRemove,onBlocked}) => {


  const newData = data.filter(item=>item.blocked)
  const [inputValue2, setValue] = useState('')
  const [filtered, setFilteredItems] = useState(newData)

   useEffect(() => {
        if(!data.length){

        }else {
            setFilteredItems(newData)
        }    
    },[data])

    const onChangeInput = value => {
        setFilteredItems(newData.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        setValue(value)
    }

    return (
        <div className="contacts" style={{overflow: 'auto', height: '100%'}}>
               <div className="contacts__header">
                 <h2>{'Заблокированные'}</h2>
                 <div className="contacts__search">
                <Search value={inputValue2} placeholder="Поиск по имени"
                    onChange={e=>onChangeInput(e.target.value)}
                   style={{ width: '100%' }}/>
                </div>
               </div>
         <div >
           <div >
          <div style={{marginRight: '15px'}}>
          <List itemLayout="horizontal" dataSource={filtered}
        renderItem={item => (
            <Card hoverable>
        <List.Item  
          actions={[<a onClick={()=> {
            showConfirm(item.id,onRemove)
          }} key="list-loadmore-more" style={ {fontSize:'25px'}}><CloseOutlined/></a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<span>{item.name}</span>}
              description={`Почта: ${item.email}`}/>
              <div style={{marginRight: '25px'}}>Телефон: +{item.phoneNumber} </div>
              <LockOutlined onClick={()=> onBlocked(item.id)} className={classNames('blocked',{
                    'active': item.blocked
                  })}/>
          </List.Item>
          </Card>)}/>
              </div >
             </div>
          </div>
    </div>
    )
}

export default BlockedContacts
