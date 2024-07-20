const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const projectSchema = new mongoose.Schema({
    title: String,
    description: {
        overview:String,
        objectives:String
    },
    thumbnail:String,
    leader:String,
    tag:Array,
    slug: {
        type:String,
        slug:"title",
        unique:true
    },
    createDate:String,
    approve:Boolean,
    status:String,
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt:Date
    },{
        timestamps:true
    }
);

const project = mongoose.model("project", projectSchema, "Project");

module.exports = project;