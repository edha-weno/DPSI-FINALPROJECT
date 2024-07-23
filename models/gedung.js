// models/Gedung.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Pastikan path ke database.js sudah benar

const Gedung = sequelize.define('Gedung', {
    gedungID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    namaGedung: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamatGedung: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Gedung;
