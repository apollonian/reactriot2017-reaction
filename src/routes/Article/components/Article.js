import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import Slider from 'rc-slider'
import 'rc-slider/dist/rc-slider.css'
import './Article.css'
import {
  ARTICLE_MODE_NORMAL,
  ARTICLE_MODE_SPEEDREAD,
  ARTICLE_SPEEDREAD_PAUSE,
  ARTICLE_SPEEDREAD_PLAY
} from '../modules/article'

export const Article = ({
  changeArticleMode,
  changeArticleSpeedreadState,
  changeArticleSpeedreadSpeed,
  changeArticleData,
  setIntervalId,
  gotoNextWord,
  startSpeedReading,
  stopSpeedReading,
  heading,
  content,
  mode,
  speed,
  speedreadState,
  contentWords,
  positionContentWords,
  intervalId
}) => {
  var marks = {}
  for (var i = 50; i <= 800; i += 50) {
    marks[i] = i.toString()
  }

  const isModeSpeedread = (mode === ARTICLE_MODE_SPEEDREAD)

  const handleToggle = () => {
    if (isModeSpeedread) {
      changeArticleMode(ARTICLE_MODE_NORMAL)
      stopSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PAUSE)
    } else {
      changeArticleMode(ARTICLE_MODE_SPEEDREAD)
      startSpeedReading()
      changeArticleSpeedreadState(ARTICLE_SPEEDREAD_PLAY)
    }
  }

  const handleSliderChange = (speed) => {
    stopSpeedReading()
    changeArticleSpeedreadSpeed(speed)
    startSpeedReading()
  }

  return (
    <div>
      <div className='Toggle__Reader'>
        <label htmlFor='Toggle__Status' className='Toggle__Label'>Speed Read</label>
        <Toggle
          id='Toggle__Status'
          defaultChecked={isModeSpeedread}
          onChange={handleToggle}
        />
      </div>
      <div className='Article'>
        <div>
          <h1 className='Article__Title'>
            {heading}
          </h1>
        </div>

        {isModeSpeedread &&
          (
            <div className='SpeedReader'>
              <div className='SpeedReader__Controls'>
                <div className='SpeedReader__Start' />
                <Slider
                  className='SpeedReader__Slider'
                  defaultValue={speed}
                  min={50}
                  max={800}
                  step={50}
                  dots
                  marks={marks}
                  onChange={handleSliderChange}
                />
              </div>
              <div className='SpeedReader__Screen'>
                <span className='SpeedReader__Active-Word'>
                  {contentWords[positionContentWords]}
                </span>
              </div>
            </div>
          )
        }
        {!isModeSpeedread &&
          (
            <div>
              <p>{content}</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

Article.propTypes = {
  changeArticleMode: PropTypes.func.isRequired,
  changeArticleSpeedreadState: PropTypes.func.isRequired,
  changeArticleSpeedreadSpeed: PropTypes.func.isRequired,
  changeArticleData: PropTypes.func.isRequired,
  setIntervalId: PropTypes.func.isRequired,
  gotoNextWord: PropTypes.func.isRequired,
  startSpeedReading: PropTypes.func.isRequired,
  stopSpeedReading: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  speedreadState: PropTypes.string.isRequired,
  contentWords: PropTypes.array.isRequired,
  positionContentWords: PropTypes.number.isRequired,
  intervalId: PropTypes.number.isRequired
}

export default Article
