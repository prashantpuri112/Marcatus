import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState();

    useEffect(() => {
        try {

            const config = {
                headers:
                    { "Authorization": `Bearer ${localStorage.getItem('stock_client_token')}` }
            }

            axios.get('http://localhost:8080/api/user', config).then((res) => {
                setUser(res.data.user)
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
                if (err.response.data.error === "Login Required!") {
                    localStorage.removeItem('stock_client_token')
                }
            })
        } catch (err) {
            setLoading(false)
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {props.children}
        </UserContext.Provider>
    )
}