const project = require("../../models/project.model");
const filterStatusHelper = require("../../helpers/filter.status");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

const moments = require('moment');

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

    const countProject = await project.countDocuments(find);

    const objectPagination = paginationHelper(
    {
        currentPage: 1,
        limitItems: 5
    },req.query,countProject
    );
    // End pagination

    // sort
    let sort ={};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    } else{
        sort.position = "desc";
    }
    //end sort
    const projects = await project.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/project/index.pug",
        {
            moment: moments,
            pageTitle: "Project",
            projects: projects,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        }
    );
}

//changeStatus
module.exports.changeStatus = async (req,res) => {
    const status = req.params.status;
    const id = req.params.id;
    await project.updateOne({_id: id}, {status: status});
    req.flash("success", "Update successfully");
    res.redirect('back');
}

//changeMulti
module.exports.changeMulti = async (req,res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "Planned":
            await project.updateMany({ _id: { $in:ids}}, { status: "Planned"});
            break;
        case "In Progress":
            await project.updateMany({ _id: { $in:ids}}, { status: "In Progress"});
            break;
        case "Completed":
            await project.updateMany({ _id: { $in:ids}}, { status: "Completed"});
            break;
        case "delete-all":
            await project.updateMany({ _id: { $in:ids}}, { deleted: true, deletedAt: new Date()});
            break;
        default:
            break;
    }
    req.flash("success", "Change status successfully");
    res.redirect('back');
}

//delete item
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id;
    await project.updateOne({_id: id}, {deleted: true, deletedAt : new Date()});
    req.flash("success", "Delete successfully");
    res.redirect('back');
}

//Create item
module.exports.create = async (req,res)=>{
    res.render("admin/pages/project/create.pug",
        {
            pageTitle: "Create new project",
        }
    );
}

module.exports.createPost = async (req,res)=>{
    let newProject = new project(req.body);
    await newProject.save();
    res.redirect(`${systemConfig.prefixAdmin}/project`);
}


//Edit
module.exports.edit = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };
        const proj = await project.findOne(find);
    
        res.render("admin/pages/project/edit.pug",
            {
                pageTitle: "Edit project",
                proj: proj
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/project`);
    }
};


module.exports.editPatch = async (req, res) => {

    try {

        const updateResult = await project.updateOne({_id: req.params.id}, req.body);
        if (updateResult.nModified === 0) {
            req.flash("success", "No changes were made");
        } else {
            req.flash("success", "Update successfully");
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to update the project");
    }
    
    res.redirect('back');
};
//End edit


//Detail
module.exports.detail = async (req,res)=>{
    try {
        const find = {
            deleted:false,
            _id: req.params.id,
        };
        const proj = await project.findOne(find);
    
        res.render("admin/pages/project/detail.pug",
            {
                pageTitle: proj.title,
                proj: proj
            }
        );
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/project`);
    }
};
//End detail
