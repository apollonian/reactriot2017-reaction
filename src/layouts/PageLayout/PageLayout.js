import React from 'react'
// import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='PageLayout'>
    <div className='PageLayout__Header'>
      <div id='hackbit-vote-widget' />
      <a href='/'>
        <h1 className='Logo'>
          <span className='Read'>Read</span>
          <span className='Reactive'>Reactive</span>
        </h1>
      </a>
      <div className='Pitch'>Search for topics, get trending results, and read them uniquely!</div>
    </div>
    {/* <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to={{ pathname: '/article/asdf' }}
      activeClassName='page-layout__nav-item--active'>
        Article
    </Link> */}
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
