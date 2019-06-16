module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(250),
			allowNull: false
		},
		is_active: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'users',
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false
	});
};
