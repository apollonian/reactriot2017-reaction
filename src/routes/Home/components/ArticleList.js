import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import './ArticleList.css'

export const ArticleList = ({
  articleList
}) => {
  const displayList = articleList.map(
    (listItem, index) => (
      <li key={index}>
        <ul>
          <li>url: {listItem.url}</li>
          <li> urlSlug: {listItem.urlSlug} </li>
          <li><img src={listItem.imageUrl} /></li>
          <li>publication: {listItem.publication}</li>
          <li>title: {listItem.title}</li>
          <li>description:
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(listItem.description) }} />
          </li>
          <li>created: {listItem.created}</li>
        </ul>
      </li>
    )
  )

  return (
    <div>
      <ol>
        { displayList }
      </ol>
    </div>
  )
}

ArticleList.propTypes = {
  articleList: PropTypes.array.isRequired
}

export default ArticleList
