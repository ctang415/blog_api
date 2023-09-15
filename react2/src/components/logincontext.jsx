import { createContext } from 'react'

export const LoginContext = createContext( 
    {
        login: false,
        token: null,
        setToken: () => {},
        setLogin: () => {},
        logOut: () => {}
    }
)