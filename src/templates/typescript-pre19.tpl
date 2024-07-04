/* eslint-disable max-len */
import React from 'react';

interface {{%name%}}Props {
    /**
     * A string representing the CSS class to be applied to the {{%name%}}Icon element to override its default styling.
     */
    className?: string;{{%colorTypes%}}
    /**
     * A number or string representing the height of the {{%name%}}Icon element.
     */
    height?: number | string;
    /**
     * The `testId` property represents a unique identifier, usually in the form of a string, assigned to a component for testing purposes.
     */
    testId?: string;
    /**
     * A number or string representing the height of the {{%name%}}Icon element.
     */
    width?: number | string;
}

/**
 * The `{{%name%}}` component is a functional component designed to render a customizable SVG element representing an Icon.
 * It receives several props through the `{{%name%}}Props` interface, allowing for customization of class, color, dimensions, and testing identifier.
 *
 * @param props           The component props.
 * @param props.className A string representing the CSS class to be applied to the {{%name%}}Icon element to override its default styling.{{%colorDocs%}}
 * @param props.height    A number or string representing the height of the {{%name%}}Icon element.
 * @param props.testId    A string representing a unique identifier assigned to the component for testing purposes.
 * @param props.width     A number or string representing the height of the {{%name%}}Icon element.
 * @returns A React element representing the `Check` component with the specified properties.
 *
 * @example
 * ```tsx
 * const {{%name%}}Component = <{{%name%}} className="myClass" color1="#000" height="20" testId="myTestId" width="20" />;
 * ```
 */
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
    testId: '{{%name%}}',
    width: {{%width%}}
};