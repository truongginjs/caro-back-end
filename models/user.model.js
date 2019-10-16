var db = require("../utils/db-pg");

module.exports = {
    all: () => {
        return db.load("select * from users");
    },

    findOne: (entity) => {
        return db.find("users", entity)

    },
    findOneById: id => {
        return db.find("users", { id })
    },

    add: entity => {
        return db.add("users", entity);
    },

    update: entity => {
        return db.update("users", entity);
    },

    delete: id => {
        return db.delete("users", "id", id);
    }
}