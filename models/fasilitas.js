const { DataTypes, BelongsTo } = require('sequelize');
const sequelize = require('./index');
const Ruangan = require('./ruangan');

const Fasilitas = sequelize.define('Fasilitas', {
    fasilitasID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ruanganID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ruangan,
            key: 'ruanganID'
        }
    },
    namaFasilitas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

Fasilitas.belongsTo(Ruangan, {foreignKey: 'ruanganID'});
Ruangan.hasMany(Fasilitas, {foreignKey: 'ruanganID'});


module.exports = Fasilitas;