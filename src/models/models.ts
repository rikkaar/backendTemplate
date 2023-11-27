// import {sequelize} from '../db'

// import {DataTypes, Sequelize} from 'sequelize'
// import {Roles} from '@validations/apiValidations'

// interface UserAttributes  {
// 	id: number,
// 	email: string,
// 	password: string,
// 	isActivated?: boolean,
// 	activationLink?: string,
// 	role: Roles,
// 	username: string,
// 	img?: string,
// }
// interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {}

// export const User = sequelize.define<UserInstance>('user', {
// 	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// 	email: {type: DataTypes.STRING, unique: true},
// 	password: {type: DataTypes.STRING},
// 	isActivated: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: true},
// 	activationLink: {type: DataTypes.STRING, allowNull: true},
// 	role: {type: DataTypes.STRING, defaultValue: Roles.user},
// 	username: {type: DataTypes.STRING, unique: true, allowNull: false},
// 	img: {type: DataTypes.STRING, allowNull: true},
// })

// export const Token = sequelize.define('token', {
// 	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// 	refreshToken: {type: DataTypes.STRING},
// })

// // const Basket = sequelize.define('basket',{
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// // })

// // const BasketItems = sequelize.define('basket_items',{
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     quantity: {type: DataTypes.INTEGER, defaultValue: 1}
// // })

// // const Item = sequelize.define('item',{
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// //     price: {type: DataTypes.INTEGER, allowNull: false},
// //     img: {type: DataTypes.STRING, allowNull: true}
// // })

// // const Comments = sequelize.define('comments', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     // date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
// //     description: {type: DataTypes.STRING, allowNull: false},
// // })

// // const Category = sequelize.define('category', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// // })

// // const Brand = sequelize.define('brand', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     name: {type: DataTypes.STRING, unique: true, allowNull: false},
// // })

// // const Rating = sequelize.define('rating', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     rate: {type: DataTypes.FLOAT, allowNull: false},
// // })

// // const ItemInfo = sequelize.define('item_info', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// //     title: {type: DataTypes.STRING, allowNull: false},
// //     description: {type: DataTypes.STRING, allowNull: false},
// // })

// // const CategoryBrand = sequelize.define('category_brand', {
// //     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// // })

// User.hasOne(Token)
// Token.belongsTo(User)

