const blogRouter = require("./blog.route") ;
const homeRouter = require("./home.route") ;
const projectRouter = require("./project.route") ;

module.exports = (app) => {
    app.use("/",homeRouter);

    app.use("/blog", blogRouter);
    app.use("/project", projectRouter);
}