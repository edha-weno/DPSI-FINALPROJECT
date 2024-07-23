var express = require('express');
var router = express.Router();
var Peminjaman = require('../models/peminjaman');
const { authenticate, authorize } = require('../middleware/auth');
const Gedung = require('../models/gedung');
const Ruangan = require('../models/ruangan');



router.get('/r', async (req, res, next) => {
    try {
        const Fasilitass = await Peminjaman.findAll({
            attributes : ['tanggal'],
            include :[{
                model : Gedung,
                attributes : ['namaGedung','alamatGedung'],
            },
            {
                model : Ruangan,
                attributes : ['namaRuangan'],
            }
        ]        
    });
        res.json(Fasilitass);
    } catch (err) {
        next(err);
    }
});

router.get('/',authenticate, authorize(['admin','user']), async (req, res, next) => {
    try {
        const Fasilitass = await Peminjaman.findAll();
        res.json(Fasilitass);
    } catch (err) {
        next(err);
    }
});

router.post('/',  authenticate, authorize(['admin','user']), async (req, res, next) => {
    try {
        const { userID, gedungID, ruanganID, tanggal } = req.body;
        const newPeminjaman = await Peminjaman.create({ userID, gedungID, ruanganID, tanggal });
        res.status(201).json(newPeminjaman);
    } catch (err) {
        next(err);
    }
});

router.put('/:peminjamanID', authenticate, async (req, res, next) => {
    try {
        const { userID, gedungID, ruanganID, tanggal } = req.body;
        const Peminjamans = await Peminjaman.findByPk(req.params.peminjamanID);
        if (Peminjamans) {
            Peminjamans.userID = userID;
            Peminjamans.gedungID = gedungID;
            Peminjamans.ruanganID = ruanganID;
            Peminjamans.tanggal = tanggal;
            await Peminjamans.save();
            res.json(Peminjamans);
        } else {
            res.status(404).json({ message: 'Peminjaman tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:peminjamanID', authenticate, async (req, res, next) => {
    try {
        const Peminjamans = await Peminjaman.findByPk(req.params.peminjamanID);
        if (Peminjamans) {
            await Peminjamans.destroy();
            res.json({ message: 'Peminjaman dihapus' });
        } else {
            res.status(404).json({ message: 'Peminjaman tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
