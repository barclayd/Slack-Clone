export default (sequelize, DataTypes) => {
    const Channel = sequelize.define(
        'channel', {
            name: DataTypes.STRING,
            public: DataTypes.BOOLEAN,
        }, {
            underscored: true
        }, );

    Channel.associate = (models) => {
        // 1:M end to end relationship
        Channel.belongsTo(models.Team, {
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
            },
        });
        Channel.belongsToMany(models.User, {
            through: 'channel_member',
            foreignKey: {
                name: 'channelID',
                field: 'channel_id',
            },
        });
    };

    return Channel;
};