import React from 'react'
import { ContactsOutlined, StarFilled, TeamOutlined, LockOutlined} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './List.scss'

const List = ({items,CountContacts}) => {


    const icons = [<TeamOutlined  className={'team'}/>,
    <StarFilled className={'favorite active'}/> ,<LockOutlined className={'blocked active'}/>]
    const url = ['/','favourites','blocked']
    const CountContact =[...CountContacts]
    return (
        <ul className="home__list">
        <li className='title'>
             <ContactsOutlined />
            <span>Личный кабинет</span>
        </li>
       {items && items.map((item,index) => <li key={index} className={'list'}>
            <NavLink exact to={url[index]}>
                <i>{icons[index]}</i>
                <span>{item}</span>
                <span style={{marginLeft: 'auto'}}>{CountContact[index]}</span>
            </NavLink>
        </li>) }
        
    </ul>
    )
}

export default List
