var express = require('express');
var router = express.Router();
var Gedung = require('../models/gedung');
const { authenticate, authorize } = require('../middleware/auth');


//membatasi bahwa hanya admin yang bisa menggunakan end point pada data doctor
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Gedungs = await Gedung.findAll();
        res.json(Gedungs);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, async (req, res, next) => {
    try {
        const { namaGedung, alamatGedung } = req.body;
        const newGedung = await Gedung.create({ namaGedung, alamatGedung });
        res.status(201).json(newGedung);
    } catch (err) {
        next(err);
    }
});

router.put('/:gedungID', authenticate, async (req, res, next) => {
    try {
        const { namaGedung, alamatGedung } = req.body;
        const Gedungs = await Gedung.findByPk(req.params.gedungID);
        if (Gedungs) {
            Gedungs.namaGedung = namaGedung;
            Gedungs.alamatGedung = alamatGedung;
            await Gedungs.save();
            res.json(Gedungs);
        } else {
            res.status(404).json({ message: 'Gedung tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:gedungID', authenticate, async (req, res, next) => {
    try {
        const Gedungs = await Gedung.findByPk(req.params.gedungID);
        if (Gedungs) {
            await Gedungs.destroy();
            res.json({ message: 'Gedung dihapus' });
        } else {
            res.status(404).json({ message: 'Gedung tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
