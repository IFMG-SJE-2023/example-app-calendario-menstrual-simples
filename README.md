# Calendário Menstrual
Este é um aplicativo de Calendário Menstrual, desenvolvido como projeto da disciplina Tópicos em Desenvolvimento para Dispositivos Móveis. Este projeto está sendo desenvolvido pelos alunos da turma SI201.

![Progresso](https://img.shields.io/badge/progresso-95%25-brightgreen)


![Tela do calendário](https://uploaddeimagens.com.br/images/004/456/490/original/screenshot.jpg?1683449561)  

## Funcionalidades
O aplicativo permite:
1. Registro de datas de início e fim da menstruação
2. Registro de datas de relações sexuais
3. Previsão da próxima menstruação
4. Registro de informações sobre o ciclo menstrual
5. Visualização do dia de ovulação (14º dia) da última menstruação


## Tecnologias utilizadas

- React Native
- Expo
- Sequelize
- Mysql

## Como executar o projeto

1. Clonar o repositório para sua máquina:

2. Navegue até a pasta onde deseja clonar o repositório.

3. Digite o comando:

```bash
git clone https://github.com/IFMG-SJE-2023/example-app-calendario-menstrual-simples.git
```


4. Instale as dependências usando o comando
```bash
npm install
```

5. Execute o projeto com o comando 
```bash
npx expo start
```

6. Crie um banco de dados chamado appcalendar no seu mysql server, com o arquivo appcalendar3.sql

7. configure o arquivo config.json na seçao  development com os dados do seu mysql server local,  e no atributo "urlRootNode" deve ficar o IP do PC na rede, se acessar expo go com QRcode, ou IP do PC na ponte ADB, se utilizar celular conectador via cabo USB.
```bash
  "development": {
    "username": "root",
    "password": "12345",
    "database": "appcalendar3",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  
  "urlRootNode": "http://192.168.198.199:3000/",
```

8. instale e execute o nodemon na pasta do app com o comando 
```bash
npm i nodemon 
x:\appcalendar> nodemon ./Controller.js 
```

9. Escaneie o código QR exibido no terminal com o aplicativo Expo.

10. Aguarde a compilação do aplicativo e a inicialização no seu dispositivo móvel.

11. para testar mais facilmente, faça login como fulana@mail.com  senha = 123.
