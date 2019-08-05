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
    }
    this.works = props.data.works
  }

  componentWillMount() {
    const images = []
    this.works.forEach((item) => {
      const obj = {
        original: item.image,
        thumbnail: item.image,
        description: item.description,
      };
      images.push(obj);
    });
    this.setState({ images: images, works: this.works });
  }

  componentWillReceiveProps(nextProp) {
    const newImages = [];
    for (let i = 0; i < nextProp.works.length; i++) {
      const obj = {
        original: this.state.works.map(item => item.image === nextProp.works[i].image ? item.image : nextProp.works[i].image),
        thumbnail: this.state.works.map(item => item.image === nextProp.works[i].image ? item.image : nextProp.works[i].image),
        description: this.state.works.map(item => item.description === nextProp.works[i].description ? item.description : nextProp.works[i].imdescriptionge),
      };
      newImages.push(obj);
    }
    this.setState({ images: newImages });
    this.works = nextProp.data.works;
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
  data: PropTypes.object.isRequired
};

export default ImageGalleryComponent;
