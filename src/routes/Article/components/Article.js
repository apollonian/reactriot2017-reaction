import React from 'react'
import PropTypes from 'prop-types'
import Toggle from 'react-toggle'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import Select, {Option, OptGroup} from 'rc-select'
import 'rc-slider/dist/rc-slider.css'
import 'rc-select/assets/index.css'
import './Article.css'
import play from 'material-design-icons/av/svg/production/ic_play_circle_filled_48px.svg'
import pause from 'material-design-icons/av/svg/production/ic_pause_circle_filled_48px.svg'
import {
  ARTICLE_MODE_NORMAL,
  ARTICLE_MODE_SPEEDREAD,
  ARTICLE_SPEEDREAD_PAUSE,
  ARTICLE_SPEEDREAD_PLAY
} from '../modules/article'

const SliderWithTooltip = createSliderWithTooltip(Slider)

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
  for (var i = 100; i <= 800; i += 100) {
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

  const handleButton = () => {
    // Do Something
  }

  const handleSliderChange = (speed) => {
    stopSpeedReading()
    changeArticleSpeedreadSpeed(speed)
    startSpeedReading()
  }

  const options = [
      <Option value="100">100</Option>,
      <Option value="200">200</Option>,
      <Option value="300">300</Option>,
      <Option value="400">400</Option>,
      <Option value="500">500</Option>,
      <Option value="600">600</Option>
  ]

  return (
    <div>
      <div className='Article'>
        <div>
          <h1 className='Article__Title'>
            {heading}
          </h1>
        </div>

        {isModeSpeedread &&
          (
            <div>
              <div className='SpeedReader__Screen'>
                <span className='SpeedReader__Active-Word'>
                  {contentWords[positionContentWords]}
                </span>
              </div>
              <div className='SpeedReader__Controls-Container'>
                <div className='SpeedReader__Controls'>
                  <div>
                  <div className='SpeedReader__Start'>
                    {
                      isModeSpeedread
                      ? (<img src={play} onClick={handleButton} />) : (<img src={pause} onClick={handleButton} />)
                    }
                  </div>
                  <div className='Slider__Container'>
                    <div className='WPM__Label'>WPM</div>
                      <Select defaultValue={'100'} showSearch={false} onChange={handleSliderChange}>
                        {options}
                      </Select>
                  </div>
                  </div>
                  <div className='Toggle__Reader'>
                    <label htmlFor='Toggle__Status' className='Toggle__Label'>SPEED READ</label>
                    <Toggle
                      id='Toggle__Status'
                      defaultChecked={isModeSpeedread}
                      onChange={handleToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {!isModeSpeedread &&
          (
            <div>
              <p className='Article__Paragraph'>{content}</p>
              <div className='SpeedReader__Controls-Container'>
                <div className='SpeedReader__Controls'>
                  <div className='SpeedReader__Toggle-Information'>
                    <span>Toggle the switch on the right to active Speed Reading &rarr;</span>
                  </div>
                  <div className='Toggle__Reader'>
                    <label htmlFor='Toggle__Status' className='Toggle__Label'>SPEED READ</label>
                    <Toggle
                      id='Toggle__Status'
                      defaultChecked={isModeSpeedread}
                      onChange={handleToggle}
                    />
                  </div>
                </div>
              </div>
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
