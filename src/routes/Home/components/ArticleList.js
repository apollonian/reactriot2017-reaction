import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

export const ArticleList = ({
  articleList,
  loadArticle,
  loadingArticle,
  loadArticleFailure,
  loadArticleFailureMessage
}) => {
  const displayList = articleList.map(
    (listItem, index) => (
      <li key={index} onClick={() => loadArticle(index)}>
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
  articleList: PropTypes.array.isRequired,
  loadArticle: PropTypes.func.isRequired,
  loadingArticle: PropTypes.bool.isRequired,
  loadArticleFailure: PropTypes.bool.isRequired,
  loadArticleFailureMessage: PropTypes.string.isRequired
}

export default ArticleList
