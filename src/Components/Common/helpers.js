import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from 'react'
import { Modal,} from 'antd';
const { confirm } = Modal;

export const showConfirm = (id,onRemove) =>{
    confirm({
      title: 'Вы точно хотите удалить контакт?',
      icon: <ExclamationCircleOutlined />,
      content: 'Контакт будет удалён.',
      onOk() {
        onRemove(id)
      },
    });
}

export const validateMessages = {
    required: '${label} обязательное поле!',
    types: {
      email: 'Введите корректно почту!',
      number: 'Введите корректно номер',
    },

  };

{/* <List.Item  
      actions={[
        <a onClick={()=> setFormEditVisible(!visibleFormEdit)} key="list-loadmore-edit">
         <EditOutlined style={{ fontSize: '26px', color: '#08c' }}/>
      </a>
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
      </List.Item> */}
//       {!visibleFormEdit ? null
//         :   <>
//         <Drawer className='drawer' title="Редактировать контакт" placement="right"
//   closable={false} width={'400px'} onClose={()=> setFormEditVisible(!visibleFormEdit)}
//   visible={visibleFormEdit}getContainer={false}style={{ position: 'absolute' }} >
// <Form name="basic" onFinish={onFinish} 
// initialValues={{ username: 'xyi' }}
// validateMessages={validateMessages}>

// <Form.Item label="Имя" name="username"
// rules={[{ required: true, message: 'Пожалуйста введите имя' }]}>
// <Input />
// </Form.Item>
// <Form.Item label="Почта" name="Email" rules={[{ type: 'email',required: true,  }]}>
// <Input />
// </Form.Item>
// <Form.Item label="Номер телефона" name="number"
// rules={[{ type: 'number', required: true, }]}>
// <InputNumber />
// </Form.Item>
// <Form.Item >
//       <Button type="primary" htmlType="submit">
//         Редактировать
//       </Button>
//       <Button danger  onClick={()=> setFormEditVisible(!visibleFormEdit)} type="primary" htmlType="submit">
//         Отмена
//       </Button>
//  </Form.Item>
// </Form>       
// </Drawer></> }