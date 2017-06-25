// ------------------------------------
// Constants
// ------------------------------------

const testHeading = 'Test Heading - Or this is a really long heading that can take multiple lines'
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
export const ARTICLE_ACTION_SET_INTERVAL_ID = 'ARTICLE_ACTION_SET_INTERVAL_ID'
export const ARTICLE_ACTION_GOTO_NEXT_WORD = 'ARTICLE_ACTION_GOTO_NEXT_WORD'

export const splitTextIntoWords = (text) => text.split(/\s+/)
export const DEFAULT_SPEED = 100

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

export function changeArticleSpeedreadSpeed (speed = DEFAULT_SPEED) {
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
      heading: data.softTitle,
      content: data.text
    }
  }
}

export function setIntervalId (intervalId = 0) {
  return {
    type    : ARTICLE_ACTION_SET_INTERVAL_ID,
    payload : { intervalId }
  }
}

export function gotoNextWord () {
  return {
    type    : ARTICLE_ACTION_GOTO_NEXT_WORD,
    payload : {}
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

export const stopSpeedReading = () => (dispatch, getState) => {
  const intervalId = getState().article.intervalId
  window.clearInterval(intervalId)
  dispatch(setIntervalId(0))
}

export const startSpeedReading = () => (dispatch, getState) => {
  dispatch(stopSpeedReading())
  const speed = getState().article.speed
  const intervalId = window.setInterval(() => dispatch(gotoNextWord()), 60000 / speed)
  dispatch(setIntervalId(intervalId))
}

export const actions = {
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  changeArticleData,
  setIntervalId,
  gotoNextWord,
  startSpeedReading,
  stopSpeedReading
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
      'content': action.payload.content,
      'contentWords': splitTextIntoWords(action.payload.content),
      'positionContentWords': 0
    })
  },
  [ARTICLE_ACTION_SET_INTERVAL_ID] : (state, action) => {
    return Object.assign({}, state, {
      'intervalId': action.payload.intervalId
    })
  },
  [ARTICLE_ACTION_GOTO_NEXT_WORD] : (state, action) => {
    var newIndex = state.positionContentWords + 1
    if (newIndex >= state.contentWords.length) {
      newIndex = 0
    }
    return Object.assign({}, state, {
      'positionContentWords': newIndex
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  'heading': testHeading,
  'content': testContent,
  'contentWords': splitTextIntoWords(testContent),
  'positionContentWords': 0,
  'intervalId': 0,
  'mode': ARTICLE_MODE_NORMAL,
  'speed': DEFAULT_SPEED,
  'speedreadState': ARTICLE_SPEEDREAD_PAUSE
}
export default function articleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
