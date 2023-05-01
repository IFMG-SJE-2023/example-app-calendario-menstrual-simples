import db from "./SQLiteBase";

db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS relacoes_sexuais (id INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER, FOREIGN KEY(id_usuario) REFERENCES usuarios(id));"
    );
  });
  

  const create = (obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO relacoes_sexuais (parceiro, duracao, satisfeito) values (?, ?, ?);",
          [obj.parceiro, obj.duracao, obj.satisfeito],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject("Erro ao inserir obj: " + JSON.stringify(obj));
          },
          (_, error) => reject(error)
        );
      });
    });
  };
  
  const update = (id, obj) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE relacoes_sexuais SET parceiro=?, duracao=?, satisfeito=? WHERE id=?;",
          [obj.parceiro, obj.duracao, obj.satisfeito, id],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject("Erro ao atualizar obj: id=" + id);
          },
          (_, error) => reject(error)
        );
      });
    });
  };
  
  const find = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM relacoes_sexuais WHERE id=?;",
          [id],
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array[0]);
            else reject("Objeto não encontrado: id=" + id);
          },
          (_, error) => reject(error)
        );
      });
    });
  };
  
  const findByPartner = (partner) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM relacoes_sexuais WHERE parceiro LIKE ?;",
          [partner],
          (_, { rows }) => {
            if (rows.length > 0) resolve(rows._array);
            else reject("Objeto não encontrado: parceiro=" + partner);
          },
          (_, error) => reject(error)
        );
      });
    });
  };
  
  const all = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM relacoes_sexuais;",
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  };
  
  const remove = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM relacoes_sexuais WHERE id=?;",
          [id],
          (_, { rowsAffected }) => {
            resolve(rowsAffected);
          },
          (_, error) => reject(error)
        );
      });
    });
  };
  
  export default {
    create,
    update,
    find,
    findByPartner,
    all,
    remove,
  };
  