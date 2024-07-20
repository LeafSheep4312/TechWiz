const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: String,
    author:String,
    content: String,
    tags:Array,
    publishedDate:String,
    deleted:Boolean,
    status:String
});

const blogPost = mongoose.model("blogPost", blogPostSchema, "Blog");

module.exports = blogPost;