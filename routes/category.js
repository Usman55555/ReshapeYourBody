var express = require('express');
var router = express.Router();
const passport = require('passport');
const _ = require('lodash');

var {
    User
} = require('../models/user');
var {
    Category
} = require('../models/category');
var {
    authenticate,
    adminpartnerauthenticate,
    adminauthenticate,
    partnerauthenticate
} = require('../middleware/authenticate');


router.post('/addCategory', adminauthenticate, async function (req, res) {
    console.log(req.body)
    try {
        var body = {
            name: req.body.name
        }
        var categoryM = new Category(body);
        await categoryM.save();
        res.send(categoryM);
    } catch {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }
});

router.put('/updateCategory', adminauthenticate, async function (req, res) {
    console.log(req.body)
    try {
        var doc1 = await Category.findByIdAndUpdate(
            req.body.categoryId, {
                name: req.body.name
            }, {
                new: true
            }
        );
        res.send(doc1);
    } catch {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }
});

router.get('/getCategoryById', adminpartnerauthenticate, async function (req, res) {
    try {
        var doc1 = await Category.findById(req.query.CategoryId);
        res.status(200).send(doc1);
    } catch (e) {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

router.get('/getCategory', adminpartnerauthenticate, async function (req, res) {
    try {
        var doc1 = await Category.find({});
        res.status(200).send(doc1);
    } catch (e) {
        res.status(400).send({
            errmsg: "Somethin bad happened"
        });
    }

});

module.exports = router;