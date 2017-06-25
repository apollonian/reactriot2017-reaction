import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import './ArticleList.css'

export const ArticleList = ({
  articleList
}) => {
  const displayList = articleList.map(
    (listItem, index) => (
      <li key={index} className='ArticleList__Ordered-List--item'>
        <ul className='ArticleList__Card-Item'>
          <img className='Image' src={listItem.imageUrl} />
          <li className='Publication'>{listItem.publication}</li>
          <li className='Title'>{listItem.title}</li>
          {/* <li>{listItem.url}</li> */}
          {/* <li>urlSlug: {listItem.urlSlug} </li> */}
          <li className='Description__Overlay'>
            <div className='Desc' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(listItem.description) }} />
          </li>
          {/* <li>created: {listItem.created}</li> */}
        </ul>
      </li>
    )
  )

  return (
    <div>
      <ol className='ArticleList__Ordered-List'>
        { displayList }
      </ol>
    </div>
  )
}

ArticleList.propTypes = {
  articleList: PropTypes.array.isRequired
}

export default ArticleList
