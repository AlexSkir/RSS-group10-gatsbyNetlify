import Layout from '../../components/layout';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PersonalPage.css';
import PropTypes from 'prop-types';
import Avatar from '../../components/Avatar/Avatar';
import Description from '../../components/Description/Description';
import Timeline from '../../components/Timeline/Timeline';
import ListOfWorks from '../../components/ListOfWorks/ListOfWorks';
import ImageGalleryComponent from '../../components/ImageGallery/ImageGallery';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import ModalVideo from '../../components/ModalVideo/ModalVideo';
import MapContainer from '../../components/Map/Map';
import PersonalPageNavigation from '../../components/PersonalPageNavigation/PersonalPageNavigation';
import { people } from '../../data';

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: ''
    };
  }

  /* eslint-disable camelcase */
  componentWillMount() {
    const data = people[this.props.lang];
    data.forEach(item => {
      if (item.id === this.props.person) {
        this.setState({ profile: item });
      }
    });
  }

  /* eslint-disable class-methods-use-this */
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Layout>
        <div className="personal-page">
          <PersonalPageNavigation />
          <Avatar data={this.state.profile} />
          <Description data={this.state.profile} id="description" />
          <Timeline data={this.state.profile} />
          <ListOfWorks data={this.state.profile} />
          <ImageGalleryComponent data={this.state.profile} />
          <VideoPlayer data={this.state.profile} />
          <ModalVideo data={this.state.profile} />
          <MapContainer data={this.state.profile} />
        </div>
      </Layout>
    );
  }
}

PersonalPage.propTypes = {
  person: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ lang: state.locales.lang, person: state.person });
export default connect(mapStateToProps)(PersonalPage);