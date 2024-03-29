import React from 'react';
import PropTypes from 'prop-types';
import { c } from 'ttag';
import { SortableElement } from 'react-sortable-hoc';
import {
    Icon,
    Alert,
    Toggle,
    DropdownActions,
    ConfirmModal,
    useApi,
    useModals,
    useEventManager,
    useLoading,
    useNotifications
} from 'react-components';
import { isComplex } from 'proton-shared/lib/filters/factory';
import { FILTER_STATUS } from 'proton-shared/lib/constants';
import { toggleEnable, deleteFilter } from 'proton-shared/lib/api/filters';

import AddFilterModal from './AddFilterModal';

function FilterItemRow({ filter }) {
    const api = useApi();
    const [loading, withLoading] = useLoading();
    const { call } = useEventManager();
    const { createModal } = useModals();
    const { createNotification } = useNotifications();

    const { ID, Name, Status } = filter;

    const confirmDelete = async () => {
        return new Promise((resolve, reject) => {
            createModal(
                <ConfirmModal onConfirm={resolve} onClose={reject}>
                    <Alert type="warning">{c('Info').t`Are you sure you want to delete this filter?`}</Alert>
                </ConfirmModal>
            );
        });
    };

    const handleChangeStatus = async ({ target }) => {
        await api(toggleEnable(ID, target.checked));
        await call();
        createNotification({
            text: c('Success notification').t`Status updated`
        });
    };

    const handleRemove = async () => {
        await confirmDelete();
        await api(deleteFilter(filter.ID));
        await call();
        createNotification({ text: c('Success notification').t`Filter removed` });
    };

    const handleEdit = (type) => () => {
        createModal(<AddFilterModal mode="update" filter={filter} type={type} />);
    };

    const list = [
        !isComplex(filter) && {
            text: c('Action').t`Edit`,
            onClick: handleEdit()
        },
        {
            text: c('Action').t`Edit sieve`,
            onClick: handleEdit('complex')
        },
        {
            text: c('Action').t`Delete`,
            onClick: handleRemove
        }
    ].filter(Boolean);

    return (
        <tr style={{ backgroundColor: 'white', cursor: 'move' }}>
            <td>
                <Icon name="text-justify" />
            </td>
            <td>{Name}</td>
            <td>
                <div className="w10">
                    <Toggle
                        id={`item-${ID}`}
                        loading={loading}
                        checked={Status === FILTER_STATUS.ENABLED}
                        onChange={(e) => withLoading(handleChangeStatus(e))}
                    />
                </div>
            </td>
            <td>
                <DropdownActions className="pm-button--small" list={list} />
            </td>
        </tr>
    );
}

FilterItemRow.propTypes = {
    filter: PropTypes.object.isRequired
};

export default SortableElement(FilterItemRow);
