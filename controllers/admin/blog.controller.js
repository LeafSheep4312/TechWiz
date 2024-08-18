const blogPost = require("../../models/blog.model");
const filterStatusHelper = require("../../helpers/filter.status");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

module.exports.index = async (req,res)=>{
    res.render("admin/pages/blog/index.pug");
}