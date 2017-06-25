const http = require('http')
const url = require('url')
var Feed = require('rss-to-json')
const cheerio = require('cheerio')

const port = process.env.PORT || 3000

const formatList = (apiList) => {
  return apiList.map(
    (oldListItem) => {
      var newListItem = {}
      const parsedHtml = cheerio.load(oldListItem.description)
      newListItem['url'] = url.parse(oldListItem.url, true).query.url
      newListItem['imageUrl'] = parsedHtml('img').attr('src')
      newListItem['publication'] = parsedHtml('[size="-2"]').text()
      newListItem['title'] = parsedHtml('.lh > a > b').text()
      newListItem['description'] = parsedHtml('.lh > font:nth-of-type(2)').html()
      newListItem['created'] = oldListItem.created
      return newListItem
    }
  )
}

const requestHandler = (request, response) => {
  const urlParts = url.parse(request.url, true)
  const query = urlParts.query

  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Request-Method', '*')
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
  response.setHeader('Access-Control-Allow-Headers', '*')
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
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
