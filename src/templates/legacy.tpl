/* eslint-disable max-len */
import React from 'react';

import PropTypes from 'prop-types';

/**
 * {{%name%}} Icon.
 *
 * @param {object} props Component props.
 * @param {string} props.className The class name.{{%colorDocs%}}
 * @param {number|string} props.height The height.
 * @param {string} props.testId The test id.
 * @param {number|string} props.width The width.
 *
 * @returns {JSX} The svg icon.
 */
export const {{%name%}} = React.forwardRef((props, ref) => {
    const {className, {{%colors%}}height, testId, width} = props;

    return (
        <svg
            ref={ref}
            className={className}
            data-cy={testId}
            height={height}
            viewBox="0 0 {{%width%}} {{%height%}}"
            width={width}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {{%svg%}}
        </svg>
    );
});

{{%name%}}.displayName = '{{%name%}}';
{{%name%}}.propTypes = {
    className: PropTypes.string,{{%colorPropTypes%}}
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    testId: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};
{{%name%}}.defaultProps = {
    className: '',{{%colorDefaultProps%}}
    height: {{%height%}},
    testId: null,
    width: {{%width%}}
};