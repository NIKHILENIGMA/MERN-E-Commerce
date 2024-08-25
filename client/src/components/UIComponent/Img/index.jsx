import PropTypes from "prop-types";

function Img({ source, alt, className }) {
  return <img src={source} alt={alt} className={`${className}`} />;
}

Img.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
