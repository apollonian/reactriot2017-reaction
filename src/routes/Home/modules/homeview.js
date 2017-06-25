import { changeArticleData } from '../../Article/modules/article'
import { push } from 'react-router-redux'

// ------------------------------------
// Constants
// ------------------------------------

export const HOMEVIEW_ACTION_SEARCH_REQUEST = 'HOMEVIEW_ACTION_SEARCH_REQUEST'
export const HOMEVIEW_ACTION_SEARCH_SUCCESS = 'HOMEVIEW_ACTION_SEARCH_SUCCESS'
export const HOMEVIEW_ACTION_SEARCH_FAILURE = 'HOMEVIEW_ACTION_SEARCH_FAILURE'
export const HOMEVIEW_ACTION_SET_ARTICLE_LIST = 'HOMEVIEW_ACTION_SET_ARTICLE_LIST'
export const HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT = 'HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT'
export const HOMEVIEW_ACTION_LOAD_ARTICLE_REQUEST = 'HOMEVIEW_ACTION_LOAD_ARTICLE_REQUEST'
export const HOMEVIEW_ACTION_LOAD_ARTICLE_SUCCESS = 'HOMEVIEW_ACTION_LOAD_ARTICLE_SUCCESS'
export const HOMEVIEW_ACTION_LOAD_ARTICLE_FAILURE = 'HOMEVIEW_ACTION_LOAD_ARTICLE_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------

export function searchRequest () {
  return {
    type    : HOMEVIEW_ACTION_SEARCH_REQUEST,
    payload : {}
  }
}

export function searchSuccess () {
  return {
    type    : HOMEVIEW_ACTION_SEARCH_SUCCESS,
    payload : {}
  }
}

export function searchFailed (searchFailureMessage = '') {
  return {
    type    : HOMEVIEW_ACTION_SEARCH_FAILURE,
    payload : { searchFailureMessage }
  }
}

export function setSearchInputText (searchInputText = '') {
  return {
    type    : HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT,
    payload : { searchInputText }
  }
}

export function setArticleList (articleList = []) {
  return {
    type    : HOMEVIEW_ACTION_SET_ARTICLE_LIST,
    payload : { articleList }
  }
}

export function loadArticleRequest () {
  return {
    type    : HOMEVIEW_ACTION_LOAD_ARTICLE_REQUEST,
    payload : {}
  }
}

export function loadArticleSuccess () {
  return {
    type    : HOMEVIEW_ACTION_LOAD_ARTICLE_SUCCESS,
    payload : {}
  }
}

export function loadArticleFailed (loadArticleFailureMessage = '') {
  return {
    type    : HOMEVIEW_ACTION_LOAD_ARTICLE_FAILURE,
    payload : { loadArticleFailureMessage }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const searchAsync = () => {
  return async (dispatch, getState) => {
    const searchTextUri = encodeURI(getState().homeview.searchInputText)
    const fullUrl = 'https://news-api-google.herokuapp.com/searchArticles?' +
      'q=' + encodeURI(searchTextUri)
    dispatch(searchRequest())
    try {
      let apiResult = await fetch(fullUrl)
      let articleList = await apiResult.json()
      if (articleList.length === 0) {
        dispatch(searchFailed('No results returned'))
      } else {
        dispatch(searchSuccess())
        dispatch(setArticleList(articleList))
      }
    } catch (err) {
      dispatch(searchFailed(err.message))
    }
  }
}

export const loadArticle = (id) => {
  return async (dispatch, getState) => {
    const articleDetails = getState().homeview.articleList[id]
    const fullUrl = 'https://news-api-google.herokuapp.com/getArticleData?' +
      'slug=' + encodeURI(articleDetails.urlSlug) +
      '&url=' + encodeURI(articleDetails.url)
    dispatch(loadArticleRequest())
    try {
      let apiResult = await fetch(fullUrl)
      let articleData = await apiResult.json()
      dispatch(loadArticleSuccess())
      dispatch(changeArticleData(articleData))
      dispatch(push('/article/' + articleDetails.urlSlug))
      dispatch(changeArticleData(articleData))
    } catch (err) {
      dispatch(loadArticleFailed(err.message))
    }
  }
}

export const actions = {
  searchRequest,
  searchSuccess,
  searchFailed,
  setArticleList,
  searchAsync,
  loadArticle
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HOMEVIEW_ACTION_SEARCH_REQUEST]        : (state, action) => {
    return Object.assign({}, state, {
      'searching': true,
      'searchFailure': false
    })
  },
  [HOMEVIEW_ACTION_SEARCH_SUCCESS]        : (state, action) => {
    return Object.assign({}, state, {
      'searching': false,
      'searchFailure': false
    })
  },
  [HOMEVIEW_ACTION_SEARCH_FAILURE]        : (state, action) => {
    return Object.assign({}, state, {
      'searching': false,
      'searchFailure': true,
      'searchFailureMessage': action.payload.searchFailureMessage
    })
  },
  [HOMEVIEW_ACTION_SET_ARTICLE_LIST]      : (state, action) => {
    return Object.assign({}, state, {
      'articleList': action.payload.articleList
    })
  },
  [HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT]  : (state, action) => {
    return Object.assign({}, state, {
      'searchInputText': action.payload.searchInputText
    })
  },
  [HOMEVIEW_ACTION_LOAD_ARTICLE_REQUEST]   : (state, action) => {
    return Object.assign({}, state, {
      'loadingArticle': true,
      'loadArticleFailure': false
    })
  },
  [HOMEVIEW_ACTION_LOAD_ARTICLE_SUCCESS]   : (state, action) => {
    return Object.assign({}, state, {
      'loadingArticle': false,
      'loadArticleFailure': false
    })
  },
  [HOMEVIEW_ACTION_LOAD_ARTICLE_FAILURE]   : (state, action) => {
    return Object.assign({}, state, {
      'loadingArticle': false,
      'loadArticleFailure': true,
      'loadArticleFailureMessage': action.payload.loadArticleFailureMessage
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  'searchInputText': '',
  'searching': false,
  'searchFailure': false,
  'searchFailureMessage': '',
  'articleList': [],
  'loadingArticle': false,
  'loadArticleFailure': false,
  'loadArticleFailureMessage': '',
}
export default function homeViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
