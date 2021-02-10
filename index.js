const express = require('express')
const mongoose = require('mongoose')

const app = express();

const Post = require('./models/Posts')

app.use(express.json())


app.get('/posts', (req, res) => {
    Post.find((err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ posts: post })
    })
});

app.post('/posts', (req, res) => {
    const { id, title, body } = req.body
    const post = new Post({
        id: id,
        title: title,
        body: body
    });
    post.save((err, newPost) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(200).json({ msg: "Post saved" })
    })
})

app.put('/posts/:postId', (req, res) => {
    const postId = req.params.postId;
    const { title } = req.body;
    Post.findOneAndUpdate({ id: postId }, { title: title }, (err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }

        res.status(200).json({ msg: "title Updated" })

    })
})

app.delete('/post/:postId', (req, res) => {
    const postId = req.params.postId;

    Post.deleteOne({ id: postId }, (err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.status(200).json({ msg: "post deleted" })
    })
})



mongoose.connect("mongodb://localhost:27080/testDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongo connect"))
    .catch((err) => console.log(err))

const port = 3006
app.listen(port, () => console.log("server started"))