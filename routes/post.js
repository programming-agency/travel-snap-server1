const Post = require("../models/Post");

const postRoutes = (app) => {
    // POST
    app.post('/api/posts/create/', (req, res) => {
        // console.log('lksjfdsljkf', req.body);
        try {
            const data = req.body
            const { title, userName, content, country } = data
            if (!title || !userName || !content || !country) return res.status(401).json({ message: 'title, userName, content are required!' })
            const createdPost = new Post(data).save()
            res.status(200).json({ message: 'Post created successfully!', post: createdPost })
        } catch (error) {
            res.status(501).json({ message: 'Post creation failed!' })
        }
    })

    // GET
    app.get('/api/posts/', async (req, res) => {
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (error) {
            res.status(501).json({ message: 'Something went wrong!' })
        }
    })

    // destination     
    app.get('/api/posts/:country', async (req, res) => {
        const country = req.params.country;
        try {
            // Use the 'find' method to filter posts by the 'country' field
            const posts = await Post.find({ country: country });

            if (posts.length === 0) {
                // Handle the case where no matching posts are found
                return res.status(404).json({ message: 'No posts found for the specified country.' });
            }
            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts by country:', error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    });

    //  get my post
    // app.get('/api/posts/:userName', async (req, res) => {
    //     const userName = req.params.userName;
    //     try {
    //         // Use the 'find' method to filter posts by the 'username' field of the author
    //         const myPosts = await Post.find({ authorUsername: userName });

    //         if (myPosts.length === 0) {
    //             // Handle the case where no matching posts are found
    //             return res.status(404).json({ message: 'No posts found for the specified username.' });
    //         }
    //         res.status(200).json(posts);
    //     } catch (error) {
    //         console.error('Error fetching posts by username:', error);
    //         res.status(500).json({ message: 'Something went wrong!' });
    //     }
    // });

    app.get('/api/posts/:userName', async (req, res) => {
        const userName = req.params.userName;
        try {
            // Use the 'find' method to filter posts by the 'authorUsername' field
            const myPosts = await Post.find({ authorUsername: userName });
            

            if (myPosts.length === 0) {
                // Handle the case where no matching posts are found
                return res.status(404).json({ message: 'No posts found for the specified username.' });
            }
            res.status(200).json(myPosts); // Return myPosts instead of posts
        } catch (error) {
            console.error('Error fetching posts by username:', error);
            res.status(500).json({ message: 'Something went wrong!' });
        }
    });

    // DELETE

    app.delete('/api/posts/:id', async (req, res) => {
        try {
            const deletePost = await Post.findByIdAndDelete(req.params.id)
            // console.log(deletePost);
            res.status(200).json({ message: 'Student deleted successfully' })
        } catch (error) {
            res.status(500).json(error?.message)
            console.log(error);
        }
    })
}

module.exports = postRoutes;