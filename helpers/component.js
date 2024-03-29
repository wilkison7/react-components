import React from 'react';

let current = 0;

export const generateUID = (prefix) => `${prefix || 'id'}-${current++}`;
export const fakeEvent = (value) => ({ target: { value } });

/**
 * Given a list of components, nest each one in order starting with the initial children.
 * @param {Array} components
 * @param {node} initialChildren
 * @return {node}
 */
export const nestChildren = (components = [], initialChildren) => {
    const nest = (element, children) => React.cloneElement(element, [], children);
    return components.reverse().reduce((acc, Component) => {
        return nest(Component, acc);
    }, initialChildren);
};

/**
 * Group CSS class to string
 * Usefull for className prop
 * @param {Array} classNames
 * @returns {String}
 */
export const classnames = (classNames = []) => {
    return classNames
        .filter(Boolean)
        .join(' ')
        .trim();
};
