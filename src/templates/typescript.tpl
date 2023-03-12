/* eslint-disable max-len */
import React from 'react';

interface {{%name%}}Props {
    className?: string;{{%colorTypes%}}
    height?: number | string;
    testId?: string;
    width?: number | string;
}

export const {{%name%}} = React.forwardRef<SVGSVGElement, {{%name%}}Props>((props, ref) => {
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
    testId: '',
    width: {{%width%}}
};