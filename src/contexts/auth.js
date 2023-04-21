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
                    name: user.name,
                    status: true,
                });
            })
            .catch((error) => {
            });
    }
    async function checkResultUser(email, nome) {
        try {
          const result = await dbUsuarios.findByEmailandName(email, nome);
          // Ação a ser executada se o resultado for verdadeiro
          console.log('Resultado encontrado:', result);
        } catch (error) {
          // Ação a ser executada se o resultado for falso
          console.log('Erro:', error);
        }
      }

    return (
        <AuthContext.Provider value={{user }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;