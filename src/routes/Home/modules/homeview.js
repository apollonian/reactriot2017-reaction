// ------------------------------------
// Constants
// ------------------------------------

export const HOMEVIEW_ACTION_SEARCH_REQUEST = 'HOMEVIEW_ACTION_SEARCH_REQUEST'
export const HOMEVIEW_ACTION_SEARCH_SUCCESS = 'HOMEVIEW_ACTION_SEARCH_SUCCESS'
export const HOMEVIEW_ACTION_SEARCH_FAILURE = 'HOMEVIEW_ACTION_SEARCH_FAILURE'
export const HOMEVIEW_ACTION_SET_ARTICLE_LIST = 'HOMEVIEW_ACTION_SET_ARTICLE_LIST'
export const HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT = 'HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT'

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

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const searchAsync = () => {
  return async (dispatch, getState) => {
    const searchTextUri = encodeURI(getState().homeview.searchInputText)
    const fullUrl = 'https://news-api-google.herokuapp.com/?q=' + searchTextUri
    dispatch(searchRequest())
    try {
      let apiResult = await fetch(fullUrl)
      let articleList = await apiResult.json()
      dispatch(searchSuccess())
      dispatch(setArticleList(articleList))
    } catch (err) {
      dispatch(searchFailed(err.message))
    }
  }
}

export const actions = {
  searchRequest,
  searchSuccess,
  searchFailed,
  setArticleList,
  searchAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [HOMEVIEW_ACTION_SEARCH_REQUEST]   : (state, action) => {
    return Object.assign({}, state, {
      'searching': true,
      'searchFailure': false
    })
  },
  [HOMEVIEW_ACTION_SEARCH_SUCCESS]   : (state, action) => {
    return Object.assign({}, state, {
      'searching': false,
      'searchFailure': false
    })
  },
  [HOMEVIEW_ACTION_SEARCH_FAILURE]   : (state, action) => {
    return Object.assign({}, state, {
      'searching': false,
      'searchFailure': true,
      'searchFailureMessage': action.payload.searchFailureMessage
    })
  },
  [HOMEVIEW_ACTION_SET_ARTICLE_LIST] : (state, action) => {
    return Object.assign({}, state, {
      'articleList': action.payload.articleList
    })
  },
  [HOMEVIEW_ACTION_SET_SEARCH_INPUT_TEXT] : (state, action) => {
    return Object.assign({}, state, {
      'searchInputText': action.payload.searchInputText
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
  'articleList': [],
  'searchFailureMessage': ''
}
export default function homeViewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
