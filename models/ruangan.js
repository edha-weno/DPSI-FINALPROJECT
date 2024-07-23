const { DataTypes, BelongsTo } = require('sequelize');
const sequelize = require('./index');
const Gedung = require('./gedung');

const Ruangan = sequelize.define('Ruangan', {
    ruanganID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    namaRuangan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gedungID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gedung,
            key: 'gedungID'
        }
      },
});

Ruangan.belongsTo(Gedung, {foreignKey: 'gedungID'});
Gedung.hasMany(Ruangan, {foreignKey: 'gedungID'});


module.exports = Ruangan;