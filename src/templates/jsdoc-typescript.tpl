/* eslint-disable max-len */
import React from 'react';

/**
 * @typedef  {object}                            IconProps
 * @property {string}                            [className] An styled components class name for inheritance.{{%colorsDocs%}}
 * @property {number|string}                     [height]    Icon height.
 * @property {string}                            [testId]    Cypress test id.
 * @property {number|string}                     [width]     Icon width.
 * @property {React.ForwardedRef<SVGSVGElement>} [ref]       Component ref.
 */

/**
 * {{%name%}} Icon.
 *
 * @type React.FC<IconProps>
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
{{%name%}}.defaultProps = {
    className: '',{{%colorDefaultProps%}}
    height: {{%height%}},
    testId: null,
    width: {{%width%}}
};