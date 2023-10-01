const Post = require("../models/Post");

const postRoutes = (app) => {
    // POST
    app.post('/api/posts/create/', (req, res) => {
        console.log('lksjfdsljkf', req.body);
        try {
            const data = req.body
            const {title, userName, content, } = data

            if(!title || !userName || !content) return res.status(401).json({message: 'title, userName, content are required!'})
            const createdPost = new Post(data).save()
            res.status(200).json({message: 'Post created successfully!', post: createdPost})
        } catch (error) {
            res.status(501).json({message: 'Post creation failed!'})
        }
    })

    // GET
    app.get('/api/posts/', async(req, res) => {
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(501).json({message: 'Something went wrong!'})
        }
    })
    // UPDATE
    // DELETE
}

module.exports = postRoutes;