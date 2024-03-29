import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const ButtonGroup = ({ children, className = '', ...rest }) => (
    <Button className={`pm-group-button ${className}`} {...rest}>
        {children}
    </Button>
);

ButtonGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

export default ButtonGroup;
