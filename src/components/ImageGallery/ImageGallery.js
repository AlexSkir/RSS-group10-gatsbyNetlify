import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ImageGallery from 'react-image-gallery';
import './ImageGallery.css';
import PropTypes from 'prop-types';

class ImageGalleryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: '',
      images: '',
      src: ''
    }
    this.images = [];
    this.works = props.data.works
  }

  componentWillMount() {
    this.works.forEach((item) => {
      const obj = {
        original: item.image,
        thumbnail: item.image,
        description: item.description,
      };
      this.images.push(obj);
    });
    this.setState({ images: this.images, src: this.props.src });
  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.src !== this.state.src) {
      this.images = [];
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
  src: PropTypes.string.isRequired
};

export default ImageGalleryComponent;
