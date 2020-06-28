import React, { useState, useEffect } from 'react'
import '../../App.scss'
import classNames from 'classnames';
import { List,Avatar, Input,  Card,Drawer,Button, Form, InputNumber, Modal } from 'antd';
import { EditOutlined, CloseOutlined,  StarFilled, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { showConfirm, validateMessages } from '../Common/helpers';
const { Search } = Input;

const Contacts = ({data,setData,onRemove,onEdit,onFavorite,onBlocked}) => {


  const onFinish = values => {
    const {number, username, Email} = values
    odAddTask(username,Email,number)
  };
  

    useEffect(() => {
        if(!data.length){

        }else {
            setFilteredItems(data)
        }    
    },[data])


    const [inputValue2, setValue] = useState('')
    const [filtered, setFilteredItems] = useState(data)
    const [visibleForm, setFormVisible] = useState(false)
   
    const [visibleFormEdit, setFormEditVisible] = useState(false)
    const onChangeInput = value => {
      setFilteredItems(data.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0))
        setValue(value)
    }
    const [currentContacts, setCurrentContact] = useState(null)

    const onFinishEdit = values => {
      const {number, username, Email} = values
      onEdit(currentContacts.id,number,username,Email)
      setFormEditVisible(!visibleFormEdit)
    };

    const setToggleVisible = (itemId) => {
      const data = filtered.find(item=>item.id == itemId)
      setCurrentContact(data)
      setFormEditVisible(!visibleFormEdit)
    }

    const oldData = filtered
    const odAddTask = (username,Email,number)=> {
        const obj = {
          email: Email,
          phoneNumber: number,
          name: username,
          favorites: false,
          blocked : false
        }
        Axios.post('http://localhost:3001/contacts', obj).then(({data})=> {
            const newData = [
                ...oldData,
                data
            ]
            setData(newData)
            setFormVisible(!visibleForm)
 
        })
    }

    return (
        <div className="contacts" >
                <div className="contacts__header">
                 <h2>{'Контакты'}</h2>
                 <div className="contacts__search">
                <Search  value={inputValue2}  placeholder="Поиск по имени"
                 onChange={e=>onChangeInput(e.target.value)}
                 style={{ width: '100%' }}/>
                </div>
                <div className="contacts__form">
                  {!visibleForm ? <div onClick={()=> {
                      setFormVisible(!visibleForm)
    
                      }} className="contacts__form-new">
                   <Button type="primary">Добавить контакт</Button>
                </div>
                :   <>
                            <Drawer className='drawer' title="Добавить контакт" placement="right"
                      closable={false} width={'400px'} onClose={()=> setFormVisible(!visibleForm)}
                      visible={visibleForm}getContainer={false}style={{ position: 'absolute' }} >
              <Form name="basic" onFinish={onFinish}  validateMessages={validateMessages}>
                  <Form.Item label="Имя" name="username"
                  rules={[{ required: true, message: 'Пожалуйста введите имя' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Почта" name="Email" rules={[{ type: 'email',required: true,  }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Номер телефона" name="number"
                    rules={[{ type: 'number', required: true, }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item >
                          <Button type="primary" htmlType="submit">
                            Создать
                          </Button>
                          <Button danger  onClick={()=> setFormVisible(!visibleForm)} type="primary" htmlType="submit">
                            Отмена
                          </Button>
                    </Form.Item>
                  </Form>       
                    </Drawer></> }


        </div>
           </div>    
      <div style={{height: '100%'}}>
         <div style={{ height: '100%',overflow: 'auto'}}>
            <div style={{marginRight: '15px'}}>
            <List itemLayout="horizontal" dataSource={[ {
                    "email": "max_malyavin@mail.ru",
                    "phoneNumber": "00000000000",
                    "name": "Создатель приложения",
                    "favorites": false,
                    "blocked": false,
                    "id": 9}]}
                    renderItem={item => (
        <Card hoverable>
          <List.Item>
        <List.Item.Meta
          avatar={<Avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<span>{item.name}</span>} description={`Почта: ${item.email}`} />
       <div style={{marginRight: '25px'}}>Телефон: +7{item.phoneNumber} </div>
             </List.Item>
             </Card> )}/>

              <List itemLayout="horizontal"dataSource={filtered}
         renderItem={item => (
        <Card hoverable>
        <List.Item  
      actions={[
        <>
        <a onClick={()=> {
          setToggleVisible(item.id)
        }} key="list-loadmore-edit">
         <EditOutlined style={{ fontSize: '26px', color: '#08c' }}/>
      </a>
      {visibleFormEdit &&  <Modal
          title="Редактировать контакт"
          visible={visibleFormEdit}
          onOk={()=> {setFormEditVisible(!visibleFormEdit)}}
          onCancel={()=> setFormEditVisible(!visibleFormEdit)}
        >
           <Form name="basic" onFinish={onFinishEdit} 
            initialValues={{ username: currentContacts.name ,Email: currentContacts.email, number: currentContacts.phoneNumber}}
            validateMessages={validateMessages}>

            <Form.Item label="Имя" name="username"
            rules={[{ required: true, message: 'Пожалуйста введите имя' }]}>
            <Input />
            </Form.Item>
            <Form.Item label="Почта" name="Email" rules={[{ type: 'email',required: true,  }]}>
            <Input />
            </Form.Item>
            <Form.Item label="Номер телефона" name="number"
            rules={[{ type: 'number', required: true, }]}>
            <InputNumber />
            </Form.Item>
            <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Редактировать
                  </Button>
            </Form.Item>
            </Form> 
        </Modal>
        }
      </>
          , 
          <a onClick={()=> {
             showConfirm(item.id, onRemove)
            }} key="list-loadmore-more" style={ {fontSize:'25px'}}><CloseOutlined/></a>]}>
        <List.Item.Meta
          avatar={<Avatar
           src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<span>{item.name}</span>}
          description={`Почта: ${item.email}`}
        />
        <div style={{marginRight: '25px'}}>Телефон: +7{item.phoneNumber} </div>
        <div style={{marginRight: '20px'}} onClick={()=> onFavorite(item.id)}>
          <StarFilled className={classNames('favorite',{
            'active': item.favorites
          })}/> 
        </div>
        <LockOutlined onClick={()=> onBlocked(item.id)} className={classNames('blocked',{
            'active': item.blocked
          })}/>
      </List.Item>
        </Card>)} />

             </div>
          </div>
        </div>
     </div>
    )
}

export default Contacts

