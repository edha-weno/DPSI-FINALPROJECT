var express = require('express');
var router = express.Router();
var Ruangan = require('../models/ruangan');
const { authenticate, authorize } = require('../middleware/auth');


//membatasi bahwa hanya admin yang bisa menggunakan end point pada data doctor
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Ruangans = await Ruangan.findAll();
        res.json(Ruangans);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, async (req, res, next) => {
    try {
        const { namaRuangan, gedungID } = req.body;
        const newRuangan = await Ruangan.create({ namaRuangan, gedungID });
        res.status(201).json(newRuangan);
    } catch (err) {
        next(err);
    }
});

router.put('/:ruanganID', authenticate, async (req, res, next) => {
    try {
        const { namaRuangan, gedungID } = req.body;
        const Ruangans = await Ruangan.findByPk(req.params.ruanganID);
        if (Ruangans) {
            Ruangans.namaRuangan = namaRuangan;
            Ruangans.gedungID = gedungID;
            await Ruangans.save();
            res.json(Ruangans);
        } else {
            res.status(404).json({ message: 'Ruangan tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:ruanganID', authenticate, async (req, res, next) => {
    try {
        const Ruangans = await Ruangan.findByPk(req.params.doctorID);
        if (Ruangans) {
            await Ruangans.destroy();
            res.json({ message: 'Ruangan dihapus' });
        } else {
            res.status(404).json({ message: 'Ruangan tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
