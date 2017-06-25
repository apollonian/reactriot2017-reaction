import React from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import ArticleList from './ArticleList'

export const HomeView = ({
  searchAsync,
  setSearchInputText,
  loadArticle,
  searchInputText,
  searching,
  searchFailure,
  searchFailureMessage,
  articleList,
  loadingArticle,
  loadArticleFailure,
  loadArticleFailureMessage
}) => (
  <div>
    <h4>ReadReactive</h4>
    <Search
      searchInputText={searchInputText}
      searching={searching}
      searchFailure={searchFailure}
      searchFailureMessage={searchFailureMessage}
      searchAsync={searchAsync}
      setSearchInputText={setSearchInputText}
    />
    <ArticleList
      articleList={articleList}
      loadArticle={loadArticle}
      loadingArticle={loadingArticle}
      loadArticleFailure={loadArticleFailure}
      loadArticleFailureMessage={loadArticleFailureMessage}
    />
  </div>
)

HomeView.propTypes = {
  searchAsync: PropTypes.func.isRequired,
  setSearchInputText: PropTypes.func.isRequired,
  loadArticle: PropTypes.func.isRequired,
  searchInputText: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  searchFailure: PropTypes.bool.isRequired,
  searchFailureMessage: PropTypes.string.isRequired,
  articleList: PropTypes.array.isRequired,
  loadingArticle: PropTypes.bool.isRequired,
  loadArticleFailure: PropTypes.bool.isRequired,
  loadArticleFailureMessage: PropTypes.string.isRequired
}

export default HomeView
