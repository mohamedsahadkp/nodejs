/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users_informations', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true
		},
		mobile: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		created_time: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		is_active: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		is_deleted: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
	}, {
		tableName: 'users_informations',
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false
	});
};
