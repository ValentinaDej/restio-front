import PropTypes from 'prop-types';

export const PublicRoute = ({ component: Component }) => {
  return Component;
};

PublicRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
