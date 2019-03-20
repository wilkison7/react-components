import React, { useState, useEffect } from 'react';
import { c, jt } from 'ttag';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableHeader, Info, SubTitle, Block, Alert, Search, TableBody, TableRow } from 'react-components';
import { Link } from 'react-router-dom';
import { fetchMembers } from 'proton-shared/lib/state/members/actions';
import { normalize } from 'proton-shared/lib/helpers/string';

import MemberActions from './actions';
import MemberAddresses from './addresses';
import AddMemberButton from './addButton';
import MemberOptions from './options';
import MemberRole from './role';
import MemberPrivate from './private';

const MembersSection = ({ organization, members, fetchMembers }) => {
    const [keywords, setKeywords] = useState('');
    const [membersSelected, setMembers] = useState(members.data);
    const handleSearch = (value) => setKeywords(value);

    const search = (members = []) => {
        if (!keywords) {
            return members;
        }

        const normalizedWords = normalize(keywords);

        return members.filter(({ Name }) => {
            return normalize(Name).includes(normalizedWords);
        });
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        setMembers(search(members.data));
    }, [keywords, members.data]);

    return (
        <>
            <SubTitle>{c('Title').t`Users`}</SubTitle>
            <Alert learnMore="todo">
                {c('Info for members section')
                    .t`Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.`}
            </Alert>
            <Block className="flex flex-spacebetween">
                <AddMemberButton />
                <Search
                    onChange={handleSearch}
                    placeholder={c('Placeholder').t`Search for User and Addresses`}
                    delay={500}
                    value={keywords}
                />
            </Block>
            <Table>
                <TableHeader
                    cells={[
                        c('Title header for members table').t`Name`,
                        c('Title header for members table').t`Addresses`,
                        <>
                            {c('Title header for members table').t`Role`}
                            <Info url="https://protonmail.com/support/knowledge-base/member-roles/" />
                        </>,
                        <>
                            {c('Title header for members table').t`Private`}
                            <Info url="https://protonmail.com/support/knowledge-base/private-members/" />
                        </>,
                        c('Title header for members table').t`Options`,
                        c('Title header for members table').t`Actions`
                    ]}
                />
                <TableBody loading={members.loading} colSpan={6}>
                    {membersSelected.map((member) => {
                        const key = member.ID;
                        return (
                            <TableRow
                                key={key}
                                cells={[
                                    member.Name,
                                    <MemberAddresses key={key} member={member} />,
                                    <MemberRole key={key} member={member} />,
                                    <MemberPrivate key={key} member={member} />,
                                    <MemberOptions key={key} member={member} />,
                                    <MemberActions key={key} member={member} organization={organization} />
                                ]}
                            />
                        );
                    })}
                </TableBody>
            </Table>
            <Alert>{jt`You can add and manage addresses for the user in your ${(
                <Link to="/settings/addresses">{c('Link').t`Address Settings`}</Link>
            )}.`}</Alert>
        </>
    );
};

MembersSection.propTypes = {
    members: PropTypes.object.isRequired,
    fetchMembers: PropTypes.func.isRequired,
    organization: PropTypes.object.isRequired
};

const mapStateToProps = ({ members, organization: { data } }) => ({ members, organization: data });
const mapDispatchToProps = { fetchMembers };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MembersSection);
