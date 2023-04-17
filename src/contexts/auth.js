import React, { createContext, useState,Alert } from 'react';
import dbUsuarios from '../services/sqlite/Usuarios';
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

function AuthProvider({children}) {
    const [user, setUser] = useState({});
    const navigation = useNavigation();

    function singIn(email, password) {
        dbUsuarios.findByLoginAndPassword(email, password)
            .then((user) => {
                setUser({
                    id: user.id,
                    email: user.email,
                    status: true,
                });
                navigation.navigate('TelaPrincipal');
            })
            .catch((error) => {
                console.log("Erro de login")
                //Alert.alert('Erro no Email ou Senha');
            });

    }

    return (
        <AuthContext.Provider value={{ singIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;