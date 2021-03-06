/**
 * Created by avenuecode on 12/3/14.
 */
/**
 * Created by avenuecode on 12/3/14.
 */
var Absence = require('../models/absence');
var express = require('express');
var moment = require('moment');
var router = express.Router();


router.route('/absences')
    .get(function(req, res) {
        Absence.find(function(err, absences) {
            if (err) {
                return res.send(err);
            }

            res.json(absences);
        });
    })
    .post(function(req, res) {
        var absence = new Absence(req.body);

        absence.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'Absence Added' });
        });
    });


router.route('/absences/:id').put(function(req,res){
    Absence.findOne({ _id: req.params.id }, function(err, absence) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            absence[prop] = req.body[prop];
        }

        // save the movie
        absence.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Absence updated!' });
        });
    });
});

router.route('/absences/:id').get(function(req, res) {
    Absence.findOne({ _id: req.params.id}, function(err, absence) {
        if (err) {
            return res.send(err);
        }

        res.json(absence);
    });
});

router.route('/absences/:id').delete(function(req, res) {
    Absence.remove({
        _id: req.params.id
    }, function(err, absence) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});

router.route('/absences/filter/availability/:date/:period').get(function(req, res) {

    var dateFrom = moment(req.params.date);
    var dateTo = moment(dateFrom).add(1, 'days');

    var filter = {
        date: {"$gte": dateFrom.format(), "$lt": dateTo.format()},
        period: req.params.period.toUpperCase(),
        type: {$ne: ''}
    };

    Absence.find(filter, function(err, absences) {
        if (err) {
            return res.send(err);
        }

        res.json(absences);
    });
});


module.exports = router;