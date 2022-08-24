import PropTypes from 'prop-types';

function ImageGalleryItem({ webformat, id, largeImg, tags, renderImgInModal }) {
  // console.log(renderImgInModal);
  return (
    <li className="gallery-item" key={id}>
      <img
        src={webformat}
        alt={tags}
        name={largeImg}
        onClick={renderImgInModal}
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformat: PropTypes.string.isRequired,
  id: PropTypes.number,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  renderImgInModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
