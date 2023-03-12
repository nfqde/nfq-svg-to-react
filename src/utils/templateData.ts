/* eslint-disable max-lines-per-function */
import {
    generateColorDefaultProps,
    generateColorDestructString,
    generateColorJsdocType,
    generateColorPropTypes,
    generateColorsDocsLegacy,
    generateColorTypes,
    getComponentName,
    parseForColors,
    parseForDimensions,
    replaceColors
} from './utils';

import type {INode} from 'svgson';


interface DataOptions {
    file: string;
    HAST: INode;
    svg: string;
}

/**
 * Get the template data.
 *
 * @param template   The template name.
 * @param props      The props.
 * @param props.file The file name.
 * @param props.HAST The HAST tree.
 * @param props.svg  The SVG string.
 * @returns The template data.
 */
export const getTemplateData = (template: string, {file, HAST, svg}: DataOptions) => {
    const dimensions = parseForDimensions(HAST);
    const colors = parseForColors(HAST);

    switch (template) {
        case 'jsdoc-typescript':
            return [
                {
                    replace: getComponentName(file),
                    search: /\{\{%name%\}\}/gu
                },
                {
                    replace: replaceColors(svg, colors),
                    search: /\{\{%svg%\}\}/gu
                },
                {
                    replace: dimensions.height,
                    search: /\{\{%height%\}\}/gu
                },
                {
                    replace: dimensions.width,
                    search: /\{\{%width%\}\}/gu
                },
                {
                    replace: generateColorDefaultProps(colors),
                    search: /\{\{%colorDefaultProps%\}\}/gu
                },
                {
                    replace: generateColorDestructString(colors),
                    search: /\{\{%colors%\}\}/gu
                },
                {
                    replace: generateColorJsdocType(colors),
                    search: /\{\{%colorsDocs%\}\}/gu
                }
            ];
        case 'typescript':
            return [
                {
                    replace: getComponentName(file),
                    search: /\{\{%name%\}\}/gu
                },
                {
                    replace: replaceColors(svg, colors),
                    search: /\{\{%svg%\}\}/gu
                },
                {
                    replace: dimensions.height,
                    search: /\{\{%height%\}\}/gu
                },
                {
                    replace: dimensions.width,
                    search: /\{\{%width%\}\}/gu
                },
                {
                    replace: generateColorDefaultProps(colors),
                    search: /\{\{%colorDefaultProps%\}\}/gu
                },
                {
                    replace: generateColorDestructString(colors),
                    search: /\{\{%colors%\}\}/gu
                },
                {
                    replace: generateColorTypes(colors),
                    search: /\{\{%colorTypes%\}\}/gu
                }
            ];
        case 'legacy':
            return [
                {
                    replace: getComponentName(file),
                    search: /\{\{%name%\}\}/gu
                },
                {
                    replace: replaceColors(svg, colors),
                    search: /\{\{%svg%\}\}/gu
                },
                {
                    replace: dimensions.height,
                    search: /\{\{%height%\}\}/gu
                },
                {
                    replace: dimensions.width,
                    search: /\{\{%width%\}\}/gu
                },
                {
                    replace: generateColorDefaultProps(colors),
                    search: /\{\{%colorDefaultProps%\}\}/gu
                },
                {
                    replace: generateColorDestructString(colors),
                    search: /\{\{%colors%\}\}/gu
                },
                {
                    replace: generateColorsDocsLegacy(colors),
                    search: /\{\{%colorDocs%\}\}/gu
                },
                {
                    replace: generateColorPropTypes(colors),
                    search: /\{\{%colorPropTypes%\}\}/gu
                }
            ];
        default:
            return [];
    }
};