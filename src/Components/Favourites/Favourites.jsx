import React, { useState, useEffect } from 'react'
import { List, Card, Avatar, Input,Modal } from 'antd'
import { StarFilled, CloseOutlined } from '@ant-design/icons'
import classNames from 'classnames';
import { showConfirm } from '../Common/helpers';
const { Search } = Input;

const Favourites = ({data,onFavorite,onRemove}) => {


  const newData = data.filter(item=>item.favorites)
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
                 <h2>{'Избранные'}</h2>
                 <div className="contacts__search">
                <Search
                value={inputValue2} 
                placeholder="Поиск по имени"
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
              actions={[ <a onClick={()=> {
                showConfirm(item.id, onRemove)
               }} key="list-loadmore-more" style={ {fontSize:'25px'}}><CloseOutlined/></a>]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<span>{item.name}</span>}
                  description={`Почта: ${item.email}`}
                />
                 <div style={{marginRight: '25px'}}>Телефон: +{item.phoneNumber} </div>
                <div style={{marginRight: '20px'}} onClick={()=> onFavorite(item.id)}>
                  <StarFilled className={classNames('favorite',{
                    'active': item.favorites
                  })}/> 
                </div>
              </List.Item>
        </Card> )}/>
                </div>
              </div>
          </div>
    </div>
    )
}

export default Favourites
