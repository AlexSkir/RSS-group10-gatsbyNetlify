import React, { Component } from 'react';
import './Avatar.css';
import PropTypes from 'prop-types';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: ''
    }
  }

  componentDidMount() {
    this.setState({ avatar: this.props.data.avatar, name: this.props.data.name })
  }

  componentWillReceiveProps(nextProp) {
    console.log(nextProp.data.avatar)
    if (nextProp.data.avatar !== this.state.avatar) {
      this.setState({ avatar: nextProp.data.avatar })
    }
  }

  render() {
    return (
      <div className="avatar-container" id="avatar">
        <img src={this.state.avatar} alt={this.state.name} />
      </div>
    );
  }
}

Avatar.propTypes = {
  data: PropTypes.object.isRequired
};

export default Avatar;
