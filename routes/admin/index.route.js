const systemConfig = require("../../config/system");

const dashboardRoutes = require("./dashboard.route") ;
const blogRoutes = require("./blog.route") ;
const projectRoutes = require("./project.route") ;
const projectCategoryRoutes = require("./project-category.route") ;

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN+"/dashboard",dashboardRoutes);
    app.use(PATH_ADMIN+"/blog",blogRoutes);
    app.use(PATH_ADMIN+"/project",projectRoutes);
    app.use(PATH_ADMIN+"/project-category",projectCategoryRoutes);
}