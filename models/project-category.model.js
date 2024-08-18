const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const projectCategorySchema = new mongoose.Schema({
    title: String,
    description:String,
    thumbnail:String,
    parent_id:{
        type: String,
        default: ""
    },
    slug: {
        type:String,    
        slug:"title",
        unique:true
    },
    status:String,
    deleted:{
        type: Boolean,
        default: false
    },
    createdAt:Date,
    deletedAt:Date
    },{
        timestamps:true
    }
);

const projectCategory = mongoose.model("projectCategory", projectCategorySchema, "Project-Category");

module.exports = projectCategory;