/**
 * Created by avenuecode on 12/3/14.
 */
var User = require('../models/user');
var express = require('express');
var router = express.Router();


router.route('/users')
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                return res.send(err);
            }

            res.json(users);
        });
    })
    .post(function(req, res) {
        var user = new User(req.body);

        user.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'User Added' });
        });
    });


router.route('/users/:id').put(function(req,res){
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        // save the movie
        user.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'User updated!' });
        });
    });
});

router.route('/users/:id').get(function(req, res) {
    User.findOne({ _id: req.params.id}, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json(user);
    });
});

router.route('/users/:id').delete(function(req, res) {
    User.remove({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        res.json({ message: 'Successfully deleted' });
    });
});


module.exports = router;