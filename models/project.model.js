const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const projectSchema = new mongoose.Schema({
    title: String,
    description:String,
    content:String,
    thumbnail:String,
    leader:String,
    tag:Array,
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

const project = mongoose.model("project", projectSchema, "Project");

module.exports = project;