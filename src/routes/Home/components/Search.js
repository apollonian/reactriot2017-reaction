import React from 'react'
import PropTypes from 'prop-types'

export const Search = ({
  searchAsync,
  setSearchInputText,
  searchInputText,
  searching,
  searchFailure,
  searchFailureMessage
}) => (
  <div>
    <form
      onSubmit={event => {
        event.preventDefault()
        searchAsync()
      }}
    >
      <label>
        Search Topic:
        <input
          type='text'
          value={searchInputText}
          onChange={event => setSearchInputText(event.target.value)}
        />
      </label>
      <input type='submit' value='Submit' />
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
