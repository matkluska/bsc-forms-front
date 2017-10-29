import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'material-ui/Slider'
import {grey500} from 'material-ui/styles/colors'
import RequiredAsterisk from 'components/RequiredAsterisk';


class LinearScaleReply extends React.Component {
  constructor() {
    super();
  }

  render() {
    const styles = {
      textQuestion: {
        marginBottom: 0
      },
      linearScale: {
        margin: 0
      },
      topSliderLabel: {
        marginBottom: 0,
        color: grey500
      },
      bottomSliderLabel: {
        marginTop: 0
      }
    };

    const {id, question, isRequired, handleReplyChange, min, max, minLabel, maxLabel} = this.props;

    return (
      <div>
        <p style={styles.textQuestion}>
          {question}? {isRequired && <RequiredAsterisk/>}
        </p>
        <div className='row'>
          <div className='col-md-1'>
            <p style={styles.topSliderLabel}>{min}</p>
          </div>

          <div className='col-md-offset-10 col-md-1'>
            <p style={styles.topSliderLabel}>{max}</p>
          </div>
        </div>

        <Slider
          min={min}
          max={max}
          step={1}
          name='Linear scale reply'
          onChange={handleReplyChange(id, isRequired)}
          sliderStyle={styles.linearScale}
        />
        {(minLabel || maxLabel) &&
        <div className='row'>
          {minLabel &&
          <div className='col-md-1'>
            <p style={styles.bottomSliderLabel}>{minLabel}</p>
          </div>
          }
          {maxLabel &&
          <div className='col-md-offset-10 col-md-1'>
            <p style={styles.bottomSliderLabel}>{maxLabel}</p>
          </div>
          }
        </div>
        }

      </div>
    );
  }
}

LinearScaleReply.propTypes = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  handleReplyChange: PropTypes.func.isRequired,
  minLabel: PropTypes.string,
  maxLabel: PropTypes.string
};

export default LinearScaleReply;
