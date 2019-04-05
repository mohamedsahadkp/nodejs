module.exports = function(sequelize, DataTypes) {
	return sequelize.define('usersInfo', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		mobile: {
			type: DataTypes.INTEGER(15),
			allowNull: true
		},
		is_active: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'usersInfo',
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false
	});
};
