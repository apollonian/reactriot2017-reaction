import React from 'react'
import PropTypes from 'prop-types'
import Search from './Search'
import ArticleList from './ArticleList'
import './HomeView.css'
import hand from './assets/hand.png'
import rocket from './assets/rocket.png'
import sad from './assets/sad.png'

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
    {/*// TODO: Help me get this one truthy only for the first time on app load*/}
    {(!searching && searchFailure)  &&
      <div className='Hello__Fellow__Human'>
        <img src={hand} />
        <h1>Hey there!</h1>
        <span>To get started, enter a term of your liking, e.g. Cat</span>
      </div>
    }
    {searching &&
      <div className='Hello__Fellow__Human'>
        <img src={rocket} />
        <h1>Hi Buzz!</h1>
        <span>Search speed approaching speed of light.</span>
      </div>
    }
    {searchFailure &&
      <div className='Hello__Fellow__Human'>
        <img src={sad} />
        <h1>Oh Snap!</h1>
        <span>Something went wrong. Try it again.</span>
      </div>
    }
      <Search
        searchInputText={searchInputText}
        searching={searching}
        searchFailure={searchFailure}
        searchFailureMessage={searchFailureMessage}
        searchAsync={searchAsync}
        setSearchInputText={setSearchInputText}
      />
      {!searching &&
      <ArticleList
        articleList={articleList}
        loadArticle={loadArticle}
        loadingArticle={loadingArticle}
        loadArticleFailure={loadArticleFailure}
        loadArticleFailureMessage={loadArticleFailureMessage}
      />}
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
