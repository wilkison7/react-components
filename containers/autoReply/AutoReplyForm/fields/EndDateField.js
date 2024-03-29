import React from 'react';
import PropTypes from 'prop-types';
import { Row, Label, DateInput, Field } from 'react-components';
import { c } from 'ttag';
import moment from 'moment';
import { startOfDay } from '../../utils';

const EndDateField = ({ value, onChange }) => {
    const handleChange = (date) => onChange(startOfDay(date));

    return (
        <Row>
            <Label htmlFor="endDate">{c('Label').t`End date`}</Label>
            <Field>
                <DateInput
                    id="endDate"
                    className="w100"
                    defaultDate={new Date(value)}
                    setDefaultDate
                    onSelect={handleChange}
                    format={moment.localeData().longDateFormat('L')}
                />
            </Field>
        </Row>
    );
};

EndDateField.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default EndDateField;
