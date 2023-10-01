const postRoutes = require("./post")
const upload = require("./upload")

const routes = (app) => {
    postRoutes(app)
    upload(app)
}

module.exports = routes