const { DataTypes, BelongsTo } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Gedung = require('./gedung');
const Ruangan = require('./ruangan')
 
const Peminjaman = sequelize.define('Peminjaman', {
    peminjamanID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'userID'
        }
    },
    gedungID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Gedung,
            key: 'gedungID'
        }
    },
    ruanganID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ruangan,
            key: 'ruanganID'
        }
    },
    tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

Peminjaman.belongsTo(User, {foreignKey: 'userID'});
User.hasMany(Peminjaman, {foreignKey: 'userID'});

Peminjaman.belongsTo(Gedung, {foreignKey: 'gedungID'});
Gedung.hasMany(Peminjaman, {foreignKey: 'gedungID'});

Peminjaman.belongsTo(Ruangan, {foreignKey: 'ruanganID'});
Ruangan.hasMany(Peminjaman, {foreignKey: 'ruanganID'});


module.exports = Peminjaman;