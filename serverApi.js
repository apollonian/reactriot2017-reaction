const express = require('express')
const compression = require('compression')
const fetch = require('node-fetch')
const Url = require('url')
var Feed = require('rss-to-json')
const Cheerio = require('cheerio')
const Slug = require('slug')
const ArticleExtractor = require('unfluff')
const Summary = require('node-summary')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const formatList = (apiList) => {
  return apiList.map(
    (oldListItem) => {
      var newListItem = {}
      const parsedHtml = Cheerio.load(oldListItem.description)
      newListItem['url'] = Url.parse(oldListItem.url, true).query.url
      newListItem['imageUrl'] = parsedHtml('img').attr('src')
      newListItem['publication'] = parsedHtml('[size="-2"]').text()
      newListItem['title'] = parsedHtml('.lh > a > b').text()
      newListItem['description'] = parsedHtml('.lh > font:nth-of-type(2)').html()
      newListItem['created'] = oldListItem.created
      newListItem['urlSlug'] = Slug(newListItem['title'])
      return newListItem
    }
  )
}

app.get('/searchArticles', (request, response) => {
  const urlParts = Url.parse(request.url, true)
  const query = urlParts.query

  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  if ('q' in query) {
    Feed.load('https://news.google.com/news/section?output=rss&q=' + encodeURI(query.q),
      function (err, rss) {
        if (err) {
          return console.log('something bad happened', err)
        }

        const formattedList = formatList(rss.items)

        response.writeHead(200)
        response.end(JSON.stringify(formattedList))
      }
    )
  } else {
    response.writeHead(200)
    response.end('Sorry, wrong api')
  }
})

app.get('/getArticleData', (request, response) => {
  const urlParts = Url.parse(request.url, true)
  const query = urlParts.query

  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  if ('url' in query) {
    fetch(query.url)
      .then(function (res) {
        return res.text()
      })
      .then(function (body) {
        const articleData = ArticleExtractor(body)
        Summary.summarize(articleData.softTitle, articleData.text, function (err, summary) {
          if (err) {
            return console.log('err is ', err.message)
          } else {
            var summaryInText = {}
            if (!('text' in articleData) || articleData.text == '') {
              var summaryInText = {text: summary}
            }
            const summarizedArticleData = Object.assign({}, articleData, summaryInText,
              {
                summary,
                slug: query.slug
              }
            )
            response.writeHead(200)
            response.end(JSON.stringify(summarizedArticleData))
          }
        })
      })
      .catch(function (err) {
        console.log(err)
        response.writeHead(200)
        response.end()
      })
  } else {
    response.writeHead(200)
    response.end('Sorry, wrong api')
  }
})

app.get('/article/*', (request, response) => {
  response.redirect('/')
})

app.use(compression())
app.use(express.static(path.join(__dirname, 'dist')))

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
