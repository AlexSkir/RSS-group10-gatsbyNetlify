import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "gatsby";
import PropTypes from 'prop-types';
import './MainPage.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import SimpleSlider from '../components/Slider/Slider';
import Avatar from '../components/Avatar/Avatar';
import Description from '../components/Description/Description';
import Developer from '../components/Developer/Developer';
import Developers from '../components/Developers/Developers';
import MainPageNavigation from '../components/MainPageNavigation/MainPageNavigation';
import MainPageSliderNavigation from '../components/MainPageSliderNavigation/MainPageSliderNavigation';
import GridGallery from '../components/GridGalery/GridGalery';
import avatarVitalyMikulich from '../img/developers/VitalyMikulich.jpg';
import avatarPetriken from '../img/developers/petriken.jpg';
import avatarIrinainina from '../img/developers/irinainina.jpg';
import avatarAlexSkir from '../img/developers/AlexSkir.jpg';
import avatarJulanick from '../img/developers/Julanick.jpg';
import Layout from "../components/layout";
import { people } from '../data';
import store from '../store/store';
import DatePickers from './../components/calendar/DatePickers';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      authorDay: '',
      day: ''
    };
    this.data = people[this.props.lang];
  }

  componentWillMount() {
    const day = new Date().toISOString().substring(0, 10).split('-')[2] % 8;
    this.setState({ profile: this.data[day], authorDay: day })
  }

  componentWillUnmount() {
    this.setState(null)
  }

  onChange(event) {
    const day = event.target.value.split('-')[2] % 8;
    if(day) {
      this.setState({ day, authorDay: day, profile: this.data[day] });
    }
  }

  render() {
    return (
      <Layout>
        <div className="main-page" id="home">

          <section className="main-page-title">
            <p>
              <span className="portal">
                <FormattedMessage id="headerSubtitleSpan" />
              </span>
              <span className="portal-subtitle">
                <FormattedMessage id="headerSubtitle" />
              </span>
            </p>
            <MainPageSliderNavigation/>
          </section>
          <SimpleSlider/>
          <MainPageNavigation />
      
          <section className="author-day" id="author">
            <h2 className="title-author-day">
              <FormattedMessage id="todayAuthor" />
            </h2>
            <div className="avatar-description">
              <div className="datepicker-container">
                <Avatar data={this.state.profile} />
                <DatePickers onChange={e => this.onChange(e)} />
              </div>
              <div className="description-button">
                <Description data={this.state.profile} />
                <Button variant="contained" className="author-day-btn">
                  <FormattedMessage id="toAuthorPage">
                    {text => (
                      <Link
                        to={`/photographers/person${this.state.authorDay}`}
                        className="author-day-btn-text"
                        id={this.state.authorDay}
                        onClick={(e) => {
                          store.dispatch({ type: 'person', value: this.state.authorDay });
                        }}
                      >
                        {text}
                      </Link>
                    )}
                  </FormattedMessage>
                </Button>
              </div>
            </div>
          </section>

          <section className="description-mainpage" id="project-info">
            <h2>
              <FormattedMessage id="infoAboutPortal" />
            </h2>
            <FormattedHTMLMessage id="welcome" />
            <GridGallery />
          </section>
        </div>
        <Developers/>
      </Layout>
    )
  }
}

MainPage.propTypes = {
  person: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({ lang: state.locales.lang, person: state.person });
export default connect(mapStateToProps)(MainPage);
