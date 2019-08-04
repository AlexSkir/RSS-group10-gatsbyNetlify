import React, { Component } from 'react';
import './VideoPlayer.css';
import { FormattedMessage } from 'react-intl';
import { Player } from 'video-react';
import '../../../node_modules/video-react/dist/video-react.css';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoSrc: '',
      video: ''
    }
  }

  componentWillMount() {
    this.setState({ videoSrc: this.props.data.videoSrc, video: this.props.data.video })
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.src !== this.state.videoSrc) {
      this.setState({ videoSrc: nextProp.data.videoSrc, video: nextProp.data.video })
    }
  }

  render() {
    return (
      <div id="videoPlayer" className="videoPlayer">
        <h2
          style={{
            textAlign: 'center',
            fontSize: '44px',
            marginTop: 60,
          }}
        >
          <FormattedMessage id="video" />
        </h2>
        <Player playsInline poster={this.state.videoSrc} src={this.state.video} />
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  data: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired
};

export default VideoPlayer;
