import { connect } from 'react-redux'
import {
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  changeArticleData,
  setIntervalId,
  gotoNextWord,
  startSpeedReading,
  stopSpeedReading
 } from '../modules/article'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Article from '../components/Article'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  changeArticleMode: (mode) => changeArticleMode(mode),
  changeArticleSpeedreadState: (state) => changeArticleSpeedreadState(state),
  changeArticleSpeedreadSpeed: (state) => changeArticleSpeedreadSpeed(state),
  changeArticleData: (dataArticle) => changeArticleData(dataArticle),
  setIntervalId: (intervalId) => setIntervalId(intervalId),
  startSpeedReading,
  stopSpeedReading,
  gotoNextWord
}

const mapStateToProps = (state) =>
({
  heading: state.article.heading,
  content: state.article.content,
  mode: state.article.mode,
  speed: state.article.speed,
  speedreadState: state.article.speedreadState,
  contentWords: state.article.contentWords,
  positionContentWords: state.article.positionContentWords,
  intervalId: state.article.intervalId
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Article)
