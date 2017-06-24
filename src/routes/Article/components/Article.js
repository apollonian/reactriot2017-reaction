import React from 'react'
import PropTypes from 'prop-types'

export const Article = ({ article, increment, doubleAsync }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Article: {article}</h2>
    <button className='btn btn-primary' onClick={increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-secondary' onClick={doubleAsync}>
      Double (Async)
    </button>
  </div>
)
Article.propTypes = {
  article: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default Article
