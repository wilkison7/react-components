import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-components';
import humanSize from 'proton-shared/lib/helpers/humanSize';

const MemberFeatures = ({ member }) => {
    const { MaxSpace, MaxVPN } = member;

    return (
        <>
            <div>
                <Icon name="user-storage" /> {humanSize(MaxSpace, 'GB')}
            </div>
            <div>
                <Icon name="protonvpn" /> {MaxVPN}
            </div>
        </>
    );
};

MemberFeatures.propTypes = {
    member: PropTypes.object.isRequired
};

export default MemberFeatures;
