import React from 'react'
import PropTypes from 'prop-types'

export const Article = ({
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  changeArticleData,
  heading,
  content,
  mode,
  speed,
  speedreadState
}) => (
  <div>
    <h1>
      HELLP
    </h1>
  </div>
)
Article.propTypes = {
  changeArticleMode: PropTypes.func.isRequired,
  changeArticleSpeedreadState: PropTypes.func.isRequired,
  changeArticleSpeedreadSpeed: PropTypes.func.isRequired,
  changeArticleData: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  speedreadState: PropTypes.string.isRequired
}

export default Article
