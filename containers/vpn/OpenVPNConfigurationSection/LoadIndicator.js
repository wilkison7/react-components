import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-components';
import { c } from 'ttag';

const LoadIndicator = ({ server: { Load = 0 } }) => (
    <Tooltip title={c('Info').t`Server load`}>
        <div className="flex inline-flex-vcenter">
            <div className="load-indicator">
                <div className="load-indicator-overlay" style={{ marginTop: `${-Load * 50}%` }}></div>
            </div>
            <div className="ml0-5">{Load}%</div>
        </div>
    </Tooltip>
);

LoadIndicator.propTypes = {
    server: PropTypes.shape({
        Load: PropTypes.number
    })
};

export default LoadIndicator;
