import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState();

    useEffect(() => {
        try {
            axios.get('http://localhost:8080/api/user').then((res) => {
                setUser(res.data.user)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                if (err.response.data.message.name === "TokenExpiredError") {
                    localStorage.removeItem('stock_token')
                    window.location.href = '/'
                }
            })
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
        setLoading(false)
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {props.children}
        </UserContext.Provider>
    )
}