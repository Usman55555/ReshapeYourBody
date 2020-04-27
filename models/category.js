const {
    secret
} = require('../config/config');
const _ = require('lodash');
const {
    mongoose
} = require('../db/mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

CategorySchema.methods.toJSON = function () {
    var category = this;
    var categoryObject = category.toObject();

    return _.pick(categoryObject,
        ['_id',
            'name'
        ]);
};

var Category = mongoose.model('Category', CategorySchema);

module.exports = {
    Category
}