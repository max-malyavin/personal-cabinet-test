import Axios from "axios";


const istance = Axios.create({
     baseURL: 'http://localhost:3001/',
});


export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 10)  {
    
        return istance.get(  `users?page=${currentPage}&count=${pageSize} `).then(response=> {
        
             return response.data;
            });
        
        },
        follow(id){
            return istance.post(`follow/${id} `)
        },
        unfollow(id){
            return istance.delete(`follow/${id} `)
        },
}


export const contactsAPI = {
        delete(id){
            return istance.delete(`contacts/${id}`)
        },
        getContacts(){
            return istance.get(`contacts`).then(({data})=> data)
        },
        Edit(id,username,Email,number){
            return istance.patch(`contacts/${id}`,{name: username, email: Email,phoneNumber:number })
        },
        favotire(id, favotireItem){
            return istance.patch(`contacts/${id}`,{
                favorites: favotireItem
            })
        },
        blocked(id, blockedItem){
            return istance.patch(`contacts/${id}`,{
                blocked: blockedItem
            })
        }
} 




export const authAPI = {
    me() {
        return istance.get(`login`).then(({data})=> {
           return data.user
        });
    },
    login(username, password) {
        return istance.get(`login`).then(({data})=> {
            if(data.status === 200){
                   if(data.user.login === username && data.user.password === password){
                        return this.isLogin()
                    } else {
                        return 'Неправильный логин или пароль'
                    }
             }
        })
    },
    isLogin() {
        return istance.put(`login`,{
            "status": 200,
            "user": {
              "login": "testing",
              "password": "123test",
              "isAuth": true
            }
        }).then(({data}) => data.user);
    },
    logout() {
        return istance.put(`login`,{
            "status": 200,
            "user": {
              "login": "testing",
              "password": "123test",
              "isAuth": false
            }
        }).then(({data}) => data.user);
    },

}
