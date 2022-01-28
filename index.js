const PORT = process.env.PORT || 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const res = require('express/lib/response')

const app = express()

app.get('/', (req,res) => {

    const url = 'https://www.fmylife.com/random'
    const posts = []
    const ran = Math.floor(Math.random() * posts.length)

    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('.block.text-blue-500.my-4', html).each(function() {
                const post = $(this).text()
                posts.push(post)
            })
            res.json(posts)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}.`))