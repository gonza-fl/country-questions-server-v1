const UserStats = require('./UserStats');
const User = require('./user');

User.hasMany(UserStats, { foreignKey: 'userId' });
UserStats.belongsTo(User, { foreignKey: 'userId' });
