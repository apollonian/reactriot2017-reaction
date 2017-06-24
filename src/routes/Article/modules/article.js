// ------------------------------------
// Constants
// ------------------------------------

const testHeading = 'Test Heading'
const testContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
  '\nRepellat, deserunt corrupti quam obcaecati est, corporis!' +
  '\nNatus fugiat, porro numquam sit odio, error minima consectetur impedit' +
  '\nerror minima consectetur impedit nostrum repellat, ex vel rem?'

export const ARTICLE_MODE_NORMAL = 'ARTICLE_MODE_NORMAL'
export const ARTICLE_MODE_SPEEDREAD = 'ARTICLE_MODE_SPEEDREAD'
export const ARTICLE_SPEEDREAD_PAUSE = 'ARTICLE_SPEEDREAD_PAUSE'
export const ARTICLE_SPEEDREAD_PLAY = 'ARTICLE_SPEEDREAD_PLAY'

export const ARTICLE_ACTION_CHANGE_MODE = 'ARTICLE_ACTION_CHANGE_MODE'
export const ARTICLE_ACTION_CHANGE_SPEEDREAD_STATE = 'ARTICLE_ACTION_CHANGE_SPEEDREAD_STATE'
export const ARTICLE_ACTION_CHANGE_SPEEDREAD_SPEED = 'ARTICLE_ACTION_CHANGE_SPEEDREAD_SPEED'
export const ARTICLE_ACTION_SET_ARTICLE_DATA = 'ARTICLE_ACTION_SET_ARTICLE_DATA'

// ------------------------------------
// Actions
// ------------------------------------
/*
export function increment (value = 1) {
  return {
    type    : ARTICLE_MODE_NORMAL,
    payload : value
  }
}
*/

export function changeArticleMode (mode = ARTICLE_MODE_NORMAL) {
  return {
    type    : ARTICLE_ACTION_CHANGE_MODE,
    payload : { mode }
  }
}

export function changeArticleSpeedreadState (speedreadState = ARTICLE_SPEEDREAD_PAUSE) {
  return {
    type    : ARTICLE_ACTION_CHANGE_SPEEDREAD_STATE,
    payload : { speedreadState }
  }
}

export function changeArticleSpeedreadSpeed (speed = 0) {
  return {
    type    : ARTICLE_ACTION_CHANGE_SPEEDREAD_SPEED,
    payload : { speed }
  }
}

export function changeArticleData (data = {
  'heading': testHeading,
  'content': testContent
}) {
  return {
    type    : ARTICLE_ACTION_SET_ARTICLE_DATA,
    payload : {
      'heading': data.heading,
      'content': data.content
    }
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */
/*
export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : ARTICLE_MODE_NORMAL,
          payload : getState().article
        })
        resolve()
      }, 200)
    })
  }
}
*/

export const actions = {
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  changeArticleData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ARTICLE_ACTION_CHANGE_MODE]            : (state, action) => {
    return Object.assign({}, state, {
      'mode': action.payload.mode
    })
  },
  [ARTICLE_ACTION_CHANGE_SPEEDREAD_STATE] : (state, action) => {
    return Object.assign({}, state, {
      'speedreadState': action.payload.speedreadState
    })
  },
  [ARTICLE_ACTION_CHANGE_SPEEDREAD_SPEED] : (state, action) => {
    return Object.assign({}, state, {
      'speed': action.payload.speed
    })
  },
  [ARTICLE_ACTION_SET_ARTICLE_DATA]       : (state, action) => {
    return Object.assign({}, state, {
      'heading': action.payload.heading,
      'content': action.payload.content
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  'heading': testHeading,
  'content': testContent,
  'mode': ARTICLE_MODE_NORMAL,
  'speed': 0,
  'speedreadState': ARTICLE_SPEEDREAD_PAUSE
}
export default function articleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
