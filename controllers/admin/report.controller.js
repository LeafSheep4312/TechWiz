const blogPost = require("../../models/report.model");
const filterStatusHelper = require("../../helpers/filter.status");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

module.exports.index = async (req,res)=>{

    const filterStatus = filterStatusHelper(req.query);


    let find = {
        deleted: false
    };

    if(req.query.status){
        find.status = req.query.status;
    }


    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    //Pagination

    const countReport = await blogPost.countDocuments(find);

    const objectPagination = paginationHelper(
    {
        currentPage: 1,
        limitItems: 5
    },req.query,countPosts
    );


    // End pagination

    const blogPosts = await blogPost.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/pages/blog/index.pug",
        {
            pageTitle: "Blog",
            blogPosts: blogPosts,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        }
    );
}