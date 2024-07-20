const projects = require("../../models/project.model.js");

module.exports.index = async (req,res)=>{
    const project = await projects.find({});
    
    // blogPosts.forEach(item => {
    //     item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(2);
    // })

    res.render("client/pages/project/index.pug",
        {
            pageTitle: "Project",
            project: project
        }
    );
}