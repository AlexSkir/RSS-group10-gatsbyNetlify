import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ImageGallery from 'react-image-gallery';
import './ImageGallery.css';
import PropTypes from 'prop-types';

class ImageGalleryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: props.data.works,
      images: ''
    }
    this.images = [];
  }

  componentWillMount() {
    this.state.works.forEach((item) => {
      const obj = {
        original: item.image,
        thumbnail: item.image,
        description: item.description,
      };
      this.images.push(obj);
    });
    this.setState({ images: this.images });
  }

  componentWillReceiveProps(nextProp) {
    nextProp.data.works.forEach(item => {
      if (this.state.images.indexOf(item) === -1) {
        nextProp.data.works.forEach((item) => {
          const obj = {
            original: item.image,
            thumbnail: item.image,
            description: item.description,
          };
          this.images.push(obj);
        });
        this.setState({ images: this.images });
      }
    });
  }

  render() {
    return (
      <div id="imageGalleryComponent" >
        <h2 style={{
          textAlign: 'center', fontSize: '44px', marginTop: 60,
        }}>
          <FormattedMessage id="imageGalery" />
        </h2>
        <ImageGallery items={this.state.images} className="images" />
      </div>
    );
  }
}

ImageGalleryComponent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ImageGalleryComponent;
