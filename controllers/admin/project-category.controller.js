const projectCategory = require("../../models/project-category.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req,res)=>{
     res.render("admin/pages/project-category/index.pug",
        {
            pageTitle: "Project Category",
        }
    );
}

module.exports.create = async (req,res)=>{
    res.render("admin/pages/project-category/create",
       {
           pageTitle: "Create Project Category",
       }
   );
}

module.exports.createPost = async (req,res)=>{
    const record = new projectCategory(req.body);
    await record.save();
    console.log(req.body);

    res.redirect(`${systemConfig.prefixAdmin}/project-category`);
}