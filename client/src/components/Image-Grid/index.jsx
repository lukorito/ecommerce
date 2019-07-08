import React from 'react';
import './image-grid.scss';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ImageViewer = ({image}) => {
  return(
    <article className="image-grid">
      <Image src={require(`../../assets/landing-images/${image}`)} alt={image} />
    </article>
  );
};

ImageViewer.propTypes = {
  image: PropTypes.string.isRequired
};

export default ImageViewer;
