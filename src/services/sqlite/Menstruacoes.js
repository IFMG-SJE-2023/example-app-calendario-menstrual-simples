import db from "./SQLiteBase";

db.transaction((tx) => {
    tx.executeSql(
        "CREATE TABLE IF NOT EXISTS menstruacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, data_ultima_menstruacao TEXT, data_proxima_menstruacao TEXT, informacoes_menstruais TEXT, intervalo INTEGER, id_usuario INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuarios(id));"
    );
});

const create = (obj,id_usuario) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "INSERT INTO menstruacoes (data_ultima_menstruacao, data_proxima_menstruacao, informacoes_menstruais, intervalo, id_usuario) values (?, ?, ?, ?, ?);"
                [obj.data_ultima_menstruacao, obj.data_proxima_menstruacao, obj.informacoes_menstruais, obj.intervalo, id_usuario],
                //-----------------------
                (_, { rowsAffected, insertId }) => {s
                    if (rowsAffected > 0) resolve(insertId);
                    else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

const update = (id, obj) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "UPDATE menstruacoes SET data_ultima_menstruacao=?, data_proxima_menstruacao=?, informacoes_menstruais=?, intervalo=?, id_usuario=? WHERE id=?;"
                [obj.data_ultima_menstruacao, obj.data_proxima_menstruacao, obj.informacoes_menstruais, obj.intervalo, obj.id_usuario, id],
                //-----------------------
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) resolve(rowsAffected);
                    else reject("Error updating obj: id=" + id); // nenhum registro alterado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

const find = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM menstruacoes WHERE id=?;",
                [id],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(rows.array[0]);
                    else reject("Obj not found: id=" + id); // nenhum registro encontrado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

const findByDate = (data) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM menstruacoes WHERE data_ultima_menstruacao LIKE ?;",
                [data],
                //-----------------------
                (_, { rows }) => {
                    if (rows.length > 0) resolve(rows.array);
                    else reject("Obj not found: data_ultima_menstruacao=" + data); // nenhum registro encontrado
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};
const all = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "SELECT * FROM menstruacoes;",
                [],
                //-----------------------
                (_, { rows }) => resolve(rows.array),
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //comando SQL modificável
            tx.executeSql(
                "DELETE FROM menstruacoes WHERE id=?;",
                [id],
                //-----------------------
                (_, { rowsAffected }) => {
                    resolve(rowsAffected);
                },
                (_, error) => reject(error) // erro interno em tx.executeSql
            );
        });
    });
};

export default {
    create,
    update,
    find,
    findByDate,
    all,
    remove,
};