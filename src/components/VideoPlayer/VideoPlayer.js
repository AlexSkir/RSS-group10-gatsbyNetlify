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
    console.log('next: ', nextProp.data.videoSrc, 'now: ', this.state.videoSrc)
    if (nextProp.data.videoSrc !== this.state.videoSrc) {
      this.setState({ videoSrc: nextProp.data.videoSrc })
    }
    if (nextProp.data.video !== this.state.video) {
      this.setState({ video: nextProp.data.video })
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
};

export default VideoPlayer;
