var express = require('express');
var router = express.Router();
var Fasilitas = require('../models/fasilitas');
const { authenticate, authorize } = require('../middleware/auth');


//membatasi bahwa hanya admin yang bisa menggunakan end point pada data doctor
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Fasilitass = await Fasilitas.findAll();
        res.json(Fasilitass);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, async (req, res, next) => {
    try {
        const { ruanganID,namaFasilitas, deskripsi } = req.body;
        const newFasilitas = await Fasilitas.create({ ruanganID, namaFasilitas, deskripsi });
        res.status(201).json(newFasilitas);
    } catch (err) {
        next(err);
    }
});

router.put('/:fasilitasID', authenticate, async (req, res, next) => {
    try {
        const { ruanganID,namaFasilitas, deskripsi } = req.body;
        const Fasilitass = await Fasilitas.findByPk(req.params.fasilitasID);
        if (Fasilitass) {
            Fasilitass.ruanganID = ruanganID;
            Fasilitass.namaFasilitas = namaFasilitas;
            Fasilitass.deskripsi = deskripsi;
            await Fasilitass.save();
            res.json(Fasilitass);
        } else {
            res.status(404).json({ message: 'Fasilitas tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:fasilitasID', authenticate, async (req, res, next) => {
    try {
        const Fasilitass = await Fasilitas.findByPk(req.params.fasilitasID);
        if (Fasilitass) {
            await Fasilitass.destroy();
            res.json({ message: 'Fasilitas dihapus' });
        } else {
            res.status(404).json({ message: 'Fasilitas tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
