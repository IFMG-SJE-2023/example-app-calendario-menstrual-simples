import React, { createContext, useState, Alert } from 'react';
import dbUsuarios from '../services/sqlite/Usuarios';
import dbMenstruacoes from '../services/sqlite/Menstruacoes';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [user, setUser] = useState({
        id: null,
        email: null,
        name: null,
        status: false,
    });
    const [menstruacao, setMenstruacao] = useState({
        id: null,
        data_ultima_menstruacao: null,
        data_proxima_menstruacao: null,
        informacoes_menstruais: null,
        intervalo: null,
        idUsuario: null,
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
    function createAccount(user) {
        dbUsuarios.create(user)
            .then((id) => {
                console.log('Usuário criado com sucesso!');
                setUser({
                    id: id,
                    email: user.email,
                    name: user.nome,
                    status: true,
                });
                navigation.navigate('Cadastro');
            })
            .catch((error) => {
                console.log('Erro ao criar usuário: ' + error.message);
            });
    }
    function finalizeRegistration(menstruacao) {
        dbMenstruacoes.create(menstruacao, user.id_usuario)
            .then((id) => {
                console.log('Usuário criado com sucesso!');
                setUser({
                    id: id,
                    email: user.email,
                    name: user.nome,
                    status: true,
                });
                navigation.navigate('Cadastro');
            })
            .catch((error) => {
                console.log('Erro ao criar usuário: ' + error.message);
            });

    }


    return (
        <AuthContext.Provider value={{ user, signIn, createAccount, finalizeRegistration}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;