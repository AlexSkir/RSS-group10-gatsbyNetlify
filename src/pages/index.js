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
import MainPageNavigation from '../components/MainPageNavigation/MainPageNavigation';
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
    console.log(day)
    this.setState({ profile: this.data[day], authorDay: day })
  }

  componentWillUnmount() {
    this.setState(null)
  }

  onChange(event) {
    const day = event.target.value.split('-')[2] % 8;
    console.log(day)
    this.setState({ day, authorDay: day, profile: this.data[day] });
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid className="main-page" id="home">
            <Grid className="main-page-title">
              <p>
                <span className="portal">
                  <FormattedMessage id="headerSubtitleSpan" />
                </span>
                <span>
                  <FormattedMessage id="headerSubtitle" />
                </span>
              </p>
              <Grid className="mainpage-navigation-container">
                <AnchorLink offset="40px" href="#author">
                  <FormattedMessage id="todayAuthor" />
                </AnchorLink>
                <AnchorLink offset="40px" href="#project-info">
                  <FormattedMessage id="infoAboutPortal" />
                </AnchorLink>
                <AnchorLink offset="0px" href="#developers">
                  <FormattedMessage id="developers" />
                </AnchorLink>
              </Grid>
            </Grid>
            <SimpleSlider />
            <MainPageNavigation />
            <section className="author-day" id="author">
              <h2 className="title-author-day">
                <FormattedMessage id="todayAuthor" />
              </h2>
              <Grid className="avatar-description">
                <div className="datepicker-container">
                  <Avatar data={this.state.profile} />
                  <DatePickers onChange={e => this.onChange(e)} />
                </div>
                <Grid>
                  <Description data={this.state.profile} />
                  <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    className="author-day-button"
                  >
                    <Button variant="contained" className="author-day__btn">
                      <FormattedMessage id="toAuthorPage">
                        {text => (
                          <Link
                            to={`/photographers/person${this.state.authorDay}`}
                            className="author-day__btn-text"
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
                  </Grid>
                </Grid>
              </Grid>
            </section>
            <section className="description-mainpage" id="project-info">
              <h2>
                <FormattedMessage id="infoAboutPortal" />
              </h2>
              <FormattedHTMLMessage id="welcome" />
              <GridGallery data={this.state.profile} />
            </section>
          </Grid>
          <Grid className="developers-container" id="developers">
            <h2>
              <FormattedMessage id="developers" />
            </h2>
            <FormattedMessage id="purpose" />
            <Grid className="developers">
              <Developer
                name="Vitaly Mikulich"
                gitHub="VitalyMikulich"
                avatar={avatarVitalyMikulich}
              />
              <Developer
                name="Piotr Stashukevich"
                gitHub="petriken"
                avatar={avatarPetriken}
              />
              <Developer
                name="Irina Inina"
                gitHub="irinainina"
                avatar={avatarIrinainina}
              />
              <Developer
                name="Aleksandra Skirnevskaia"
                gitHub="AlexSkir"
                avatar={avatarAlexSkir}
              />
              <Developer
                name="Yuliya Pakidzka"
                gitHub="Julanick"
                avatar={avatarJulanick}
              />
            </Grid>
          </Grid>
        </Grid>
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
