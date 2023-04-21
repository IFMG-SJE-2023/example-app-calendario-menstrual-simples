import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("Menstruaçao.db")

//db.close();

export default db
