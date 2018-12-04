import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBowlingBall } from '@fortawesome/free-solid-svg-icons'

class Images extends Component {
  constructor() {

  }

  render() {
    return (
      {
        this.props.images.map((image, i) =>
          <div key={i} className='fadein'>
            <div
              onClick={() => this.props.removeImage(image.public_id)}
              className='delete'
            >
              <FontAwesomeIcon icon={faTimesCircle} size='2x' />
            </div>
            <img src={image.secure_url} alt='' />
          </div>
      }
    );
  }
}

export default Images;
