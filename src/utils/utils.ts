import {readFile} from 'fs/promises';
import path from 'path';

import {optimize} from 'svgo';
import {parse} from 'svgson';

import {colorMap} from './colorNameMap';

import type {INode} from 'svgson';

/**
 * Convert string to PascalCase.
 *
 * @param str The string to convert.
 * @returns The converted string.
 */
export const toPascalCase = (str: string) => str
    .replace(/[-_]+/gu, ' ')
    .replace(/[^\w\s]/gu, '')
    .replace(/\s+(.)(\w+)/gu, (match, p1: string, p2: string) => `${p1.toUpperCase() + p2.toLowerCase()}`)
    .replace(/\s/gu, '')
    .replace(/\w/u, s => s.toUpperCase());

/**
 * Get the component name from a file path.
 *
 * @param file The file path.
 * @returns The component name.
 */
export const getComponentName = (file: string) => toPascalCase(path.basename(file).replace('.svg', ''));

/**
 * Remove the SVG tag from a string and snake case attributes.
 *
 * @param svg The SVG string.
 * @returns The cleaned SVG string.
 */
export const removeSvgTag = (svg: string) => svg.replace(
    /<(.*?)>/gu,
    match => match.replace(/\s(.*?)=".*?"/gu, (attrs, attr: string) => {
        const part = attr.replace(/-(\w)/gu, (hyphen, p1: string) => p1.toUpperCase());

        return attrs.replace(attr, part);
    })
).replace(/<svg.*?>/gu, '').replace(/<\/svg>/gu, '').trim();

/**
 * Parses the svg and gives the data.
 *
 * @param file The file path.
 * @returns The data.
 */
export const getSVGData = async (file: string) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const svg = await readFile(file, 'utf8');
    const optimizedSvg = optimize(svg, {
        floatPrecision: 2,
        js2svg: {
            indent: 4,
            pretty: true
        },
        multipass: true,
        plugins: [
            {
                name: 'preset-default',
                params: {overrides: {removeViewBox: false}}
            }
        ]
    });
    const svgString = removeSvgTag(optimizedSvg.data);
    const HAST = await parse(optimizedSvg.data);

    return {
        HAST,
        svg: svgString
    };
};

/**
 * Parse the dimensions from the SVG.
 *
 * @param HAST The HAST tree.
 * @returns The dimensions.
 */
export const parseForDimensions = (HAST: INode) => {
    const {height, viewbox, width} = HAST.attributes;

    if (height && width) {
        return {
            height,
            width
        };
    }

    return {
        height: String(viewbox).split(' ')[3],
        width: String(viewbox).split(' ')[2]
    };
};

/**
 * Parse the colors from the SVG.
 *
 * @param HAST The HAST tree.
 * @returns The colors.
 */
export const parseForColors = (HAST: INode) => {
    let colors = new Set<string>();

    if ('fill' in HAST.attributes || 'stroke' in HAST.attributes) {
        const {fill, stroke} = HAST.attributes;

        if (
            fill
            && fill !== 'none'
            && !fill.startsWith('url(')
            && !fill.startsWith('var(')
            && !fill.includes('gradient')
            && fill !== 'transparent'
        ) {
            colors.add(fill);
        }

        if (
            stroke
            && stroke !== 'none'
            && !stroke.startsWith('url(')
            && !stroke.startsWith('var(')
            && !stroke.includes('gradient')
            && stroke !== 'transparent'
        ) {
            colors.add(stroke);
        }
    }

    if (HAST.children.length > 0) {
        HAST.children.forEach(child => {
            colors = new Set<string>([...colors, ...parseForColors(child)]);
        });
    }

    return colors;
};

/**
 * Replace colors in the SVG.
 *
 * @param svg    The SVG string.
 * @param colors The colors.
 * @returns The SVG string with replaced colors.
 */
export const replaceColors = (svg: string, colors: Set<string>) => {
    let newSvg = svg;

    Array.from(colors).forEach((color, index) => {
        // eslint-disable-next-line security/detect-non-literal-regexp
        newSvg = newSvg.replace(new RegExp(`"${color}"`, 'gu'), `{color${index + 1}}`);
    });

    return newSvg;
};

/**
 * Generate the color default props string.
 *
 * @param colors The colors.
 * @returns The color default props string.
 */
export const generateColorDefaultProps = (colors: Set<string>) => {
    let defaultProps = '';

    Array.from(colors).forEach((color, index) => {
        defaultProps += `\n    color${index + 1}: '${colorMap[color as keyof typeof colorMap] ? colorMap[color as keyof typeof colorMap] : color}',`;
    });

    return defaultProps;
};

/**
 * Generate the color destruct string.
 *
 * @param colors The colors.
 * @returns The color destruct string.
 */
export const generateColorDestructString = (colors: Set<string>) => {
    let destructString = '';

    Array.from(colors).forEach((color, index) => {
        destructString += `color${index + 1}, `;
    });

    return destructString;
};

/**
 * Generate the color jsdoc types.
 *
 * @param colors The colors.
 * @returns The color jsdoc types.
 */
export const generateColorJsdocType = (colors: Set<string>) => {
    let jsdocType = '';

    Array.from(colors).forEach((color, index) => {
        jsdocType += `\n * @property {string}                            [color${index + 1}]    The color var for this icon.`;
    });

    return jsdocType;
};


/**
 * Generate the color docs.
 *
 * @param colors The colors.
 * @returns The color docs.
 */
export const generateColorsDocs = (colors: Set<string>) => {
    let docs = '';

    Array.from(colors).forEach((color, index) => {
        // eslint-disable-next-line @nfq/no-magic-numbers
        if (index + 1 > 9) {
            docs += `\n * @param props.color${index + 1}   A string representing the color to be applied to the Icon.`;
        } else {
            docs += `\n * @param props.color${index + 1}    A string representing the color to be applied to the Icon.`;
        }
    });

    return docs;
};

/**
 * Generate the color types.
 *
 * @param colors The colors.
 * @returns The color types.
 */
export const generateColorTypes = (colors: Set<string>) => {
    let types = '';

    Array.from(colors).forEach((color, index) => {
        types += `\n    /**\n     * A string representing the color to be applied.\n     */\n    color${index + 1}?: string;`;
    });

    return types;
};

/**
 * Generate the color docs.
 *
 * @param colors The colors.
 * @returns The color docs.
 */
export const generateColorsDocsLegacy = (colors: Set<string>) => {
    let docs = '';

    Array.from(colors).forEach((color, index) => {
        docs += `\n * @param {string} props.color${index + 1} The color var for this icon.`;
    });

    return docs;
};

/**
 * Generate the color proptypes.
 *
 * @param colors The colors.
 * @returns The color proptypes.
 */
export const generateColorPropTypes = (colors: Set<string>) => {
    let propTypes = '';

    Array.from(colors).forEach((color, index) => {
        propTypes += `\n    color${index + 1}: PropTypes.string,`;
    });

    return propTypes;
};