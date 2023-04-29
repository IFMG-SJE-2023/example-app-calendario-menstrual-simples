import React, { createContext, useState, Alert } from 'react';
import dbUsuarios from '../services/sqlite/Usuarios';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        email: null,
        name: null,
        status: false,
    });
    const navigation = useNavigation();

    function signIn(email, password) {
        dbUsuarios.findByLoginAndPassword(email, password)
            .then((result) => {
                console.log(result[0]);
                setUser({
                    id: result[0].id,
                    email: result[0].email,
                    name: result[0].nome,
                    status: true,
                });
                navigation.navigate('TelaPrincipal');
            })
            .catch((error) => {
            });
    }
/*     async function checkResultUser(email, nome) {
        try {
            const result = await dbUsuarios.findByEmailandName(email, nome);
            // Ação a ser executada se o resultado for verdadeiro
            console.log('Resultado encontrado:', result);
        } catch (error) {
            // Ação a ser executada se o resultado for falso
            console.log('Erro:', error);
        }
    } */

    return (
        <AuthContext.Provider value={{user, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;