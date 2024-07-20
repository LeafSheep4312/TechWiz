const blogPost = require("../../models/blog.model.js");

module.exports.index = async (req,res)=>{
    const blogPosts = await blogPost.find({});
    
    // blogPosts.forEach(item => {
    //     item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(2);
    // })

    res.render("client/pages/blog/index.pug",
        {
            pageTitle: "Blog",
            blogPosts: blogPosts
        }
    );
}