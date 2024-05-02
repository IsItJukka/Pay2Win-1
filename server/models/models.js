import sequelize from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "USER"},
    rate: {type: DataTypes.FLOAT, allowNull: false, defaultValue: 0},
    avatar: {type: DataTypes.STRING},
});

export const Wish = sequelize.define('wish', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const WishItem = sequelize.define('wish_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

export const Good = sequelize.define('good', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
});

export const GoodInfo = sequelize.define('good_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.STRING, allowNull: false},
});

export const GoodTypes = sequelize.define('good_types', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

export const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    img: {type: DataTypes.STRING, allowNull: false},
});

export const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
});

User.hasOne(Wish)
Wish.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Wish.hasMany(WishItem)
WishItem.belongsTo(Wish)

GoodTypes.hasMany(Good);
Good.belongsTo(GoodTypes);

User.hasMany(Good);
Good.belongsTo(User);

Good.hasMany(Rating)
Rating.belongsTo(Good)

Good.hasMany(WishItem)
WishItem.belongsTo(Good)

Good.hasMany(GoodInfo, {as: 'info'})
GoodInfo.belongsTo(Good)

export default {
    User,
    Wish,
    WishItem,
    Good,
    GoodInfo,
    GoodTypes,
    Game,
    Rating,
};