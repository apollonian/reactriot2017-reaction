import React from 'react'
import PropTypes from 'prop-types'
import './Search.css'

export const Search = ({
  searchAsync,
  setSearchInputText,
  searchInputText,
  searching,
  searchFailure,
  searchFailureMessage
}) => (
  <div className='Search__Container'>
    <form
      onSubmit={event => {
        event.preventDefault()
        searchAsync()
      }}
    >
      <input
        className='Input__Link'
        type='text'
        value={searchInputText}
        placeholder={'Search for topics e.g. Felis catus'}
        onChange={event => setSearchInputText(event.target.value)}
      />
      <input className='Submit__Button' type='submit' value='GO!' />
    </form>
  </div>
)

Search.propTypes = {
  searchAsync: PropTypes.func.isRequired,
  setSearchInputText: PropTypes.func.isRequired,
  searchInputText: PropTypes.string.isRequired,
  searching: PropTypes.bool.isRequired,
  searchFailure: PropTypes.bool.isRequired,
  searchFailureMessage: PropTypes.string.isRequired
}

export default Search
