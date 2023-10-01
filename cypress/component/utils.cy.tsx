/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import {parse} from 'svgson';

import {
    generateColorDefaultProps,
    generateColorDestructString,
    generateColorJsdocType,
    generateColorPropTypes,
    generateColorsDocs,
    generateColorsDocsLegacy,
    generateColorTypes,
    getComponentName,
    parseForColors,
    parseForDimensions,
    removeSvgTag,
    replaceColors,
    toPascalCase
} from '../../src/utils/utils';

describe('utils.ts', () => {
    context('toPascalCase', () => {
        before(() => {
            expect(toPascalCase, 'toPascalCase').to.be.a('function');
        });

        it('should convert hello world to HelloWorld', () => {
            expect(toPascalCase('hello world')).to.equal('HelloWorld');
        });

        it('should convert hello_world to HelloWorld', () => {
            expect(toPascalCase('hello_world')).to.equal('HelloWorld');
        });

        it('should convert hello-world to HelloWorld', () => {
            expect(toPascalCase('hello-world')).to.equal('HelloWorld');
        });
    });

    context('getComponentName', () => {
        before(() => {
            expect(getComponentName, 'getComponentName').to.be.a('function');
        });

        it('should get the file name "./hello world/hello world.svg" and convert it to pascal case', () => {
            const filePath = './hello world/hello world.svg';

            expect(getComponentName(filePath)).to.equal('HelloWorld');
        });

        it('should get the file name "./hello world/hello_world.svg" and convert it to pascal case', () => {
            const filePath = './hello world/hello_world.svg';

            expect(getComponentName(filePath)).to.equal('HelloWorld');
        });

        it('should get the file name "./hello world/hello-world.svg" and convert it to pascal case', () => {
            const filePath = './hello world/hello-world.svg';

            expect(getComponentName(filePath)).to.equal('HelloWorld');
        });
    });

    context('removeSvgTag', () => {
        before(() => {
            expect(removeSvgTag, 'removeSvgTag').to.be.a('function');
        });

        it('Removes the svg tag from an svg string.', () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';

            expect(removeSvgTag(svg)).to.equal('<path d="M12" />');
        });

        it('Does not die if no svg tag is found.', () => {
            const svg = '<path d="M12" />';

            expect(removeSvgTag(svg)).to.equal('<path d="M12" />');
        });
    });

    context('parseForDimensions', () => {
        before(() => {
            expect(parseForDimensions, 'parseForDimensions').to.be.a('function');
        });

        it('Gets the dimensions of an svg with all attributes', async () => {
            const svg = '<svg height="15" width="15" viewbox="0 0 15 15"><path d="M12" /></svg>';
            const dimensions = parseForDimensions(await parse(svg));

            expect(dimensions).to.have.property('height', '15');
            expect(dimensions).to.have.property('width', '15');
        });

        it('Gets the dimensions of an svg with only width and height', async () => {
            const svg = '<svg height="15" width="15"><path d="M12" /></svg>';
            const dimensions = parseForDimensions(await parse(svg));

            expect(dimensions).to.have.property('height', '15');
            expect(dimensions).to.have.property('width', '15');
        });

        it('Gets the dimensions of an svg with only viewbox', async () => {
            const svg = '<svg viewbox="0 0 15 15"><path d="M12" /></svg>';
            const dimensions = parseForDimensions(await parse(svg));

            expect(dimensions).to.have.property('height', '15');
            expect(dimensions).to.have.property('width', '15');
        });
    });

    context('parseForColors', () => {
        before(() => {
            expect(parseForColors, 'parseForColors').to.be.a('function');
        });

        it('Parses all colors in an svg', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';

            expect(parseForColors(await parse(svg))).to.deep.eq(new Set(['#000000', '#FF0000']));
        });

        it('Parses all colors in an bigger svg', async () => {
            const svg = `<svg height="15" viewbox="0 0 15 0">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;

            expect(parseForColors(await parse(svg))).to.deep.eq(new Set(['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFFFFF']));
        });

        it('Does not die if no colors are in there', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';

            expect(parseForColors(await parse(svg))).to.deep.eq(new Set([]));
        });

        it('Does not extract exceptions', async () => {
            const svg = `<svg height="15" viewbox="0 0 15 0">
                <path fill="none" stroke="url()" d="M12" />
                <path fill="var(--test)" stroke="linear-gradient()" d="M12" />
                <path fill="transparent" stroke="radial-gradient()" d="M12" />
            </svg>`;

            expect(parseForColors(await parse(svg))).to.deep.eq(new Set([]));
        });
    });

    context('replaceColors', () => {
        before(() => {
            expect(replaceColors, 'replaceColors').to.be.a('function');
        });

        it('Replaces all colors.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(replaceColors(svg, colors))
                .to.eq('<svg height="15" viewbox="0 0 15 0"><path fill={color1} stroke={color2} d="M12" /></svg>');
        });

        it('Replaces all colors in bigger svgs.', async () => {
            const svg = `<svg height="15" viewbox="0 0 15 0">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const colors = parseForColors(await parse(svg));

            expect(replaceColors(svg, colors))
                .to.eq(`<svg height="15" viewbox="0 0 15 0">
                <path fill={color1} stroke={color2} d="M12" />
                <path fill={color3} stroke={color4} d="M12" />
                <path fill={color5} stroke={color6} d="M12" />
            </svg>`);
        });
    });

    context('generateColorDefaultProps', () => {
        before(() => {
            expect(generateColorDefaultProps, 'generateColorDefaultProps').to.be.a('function');
        });

        it('Generates the Color default props.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorDefaultProps(colors))
                .to.eq("\n    color1: '#000000',\n    color2: '#FF0000',");
        });

        it('Generates empty props if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorDefaultProps(colors))
                .to.eq('');
        });
    });

    context('generateColorDestructString', () => {
        before(() => {
            expect(generateColorDestructString, 'generateColorDestructString').to.be.a('function');
        });

        it('Generates the Color destructuring props.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorDestructString(colors))
                .to.eq('color1, color2, ');
        });

        it('Generates empty string if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorDestructString(colors))
                .to.eq('');
        });
    });

    context('generateColorJsdocType', () => {
        before(() => {
            expect(generateColorJsdocType, 'generateColorJsdocType').to.be.a('function');
        });

        it('Generates the Color jsDoc props.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorJsdocType(colors))
                .to.eq('\n * @property {string}                            [color1]    The color var for this icon.\n * @property {string}                            [color2]    The color var for this icon.');
        });

        it('Generates empty docs if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorJsdocType(colors))
                .to.eq('');
        });
    });

    context('generateColorsDocs', () => {
        before(() => {
            expect(generateColorsDocs, 'generateColorsDocs').to.be.a('function');
        });

        it('Generates the Color docs.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorsDocs(colors))
                .to.eq('\n * @param props.color1    A string representing the color to be applied to the Icon.\n * @param props.color2    A string representing the color to be applied to the Icon.');
        });

        it('Generates empty docs if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorsDocs(colors))
                .to.eq('');
        });
    });

    context('generateColorTypes', () => {
        before(() => {
            expect(generateColorTypes, 'generateColorTypes').to.be.a('function');
        });

        it('Generates the Color typescript types.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorTypes(colors))
                .to.eq('\n    /**\n     * A string representing the color to be applied.\n     */\n    color1?: string;\n    /**\n     * A string representing the color to be applied.\n     */\n    color2?: string;');
        });

        it('Generates empty types if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorTypes(colors))
                .to.eq('');
        });
    });

    context('generateColorsDocsLegacy', () => {
        before(() => {
            expect(generateColorsDocsLegacy, 'generateColorsDocsLegacy').to.be.a('function');
        });

        it('Generates the Color legacy docs.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorsDocsLegacy(colors))
                .to.eq('\n * @param {string} props.color1 The color var for this icon.\n * @param {string} props.color2 The color var for this icon.');
        });

        it('Generates empty legacy docs if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorsDocsLegacy(colors))
                .to.eq('');
        });
    });

    context('generateColorPropTypes', () => {
        before(() => {
            expect(generateColorPropTypes, 'generateColorPropTypes').to.be.a('function');
        });

        it('Generates the Color prop types.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path fill="#000000" stroke="#FF0000" d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorPropTypes(colors))
                .to.eq('\n    color1: PropTypes.string,\n    color2: PropTypes.string,');
        });

        it('Generates empty prop types if no colors are present.', async () => {
            const svg = '<svg height="15" viewbox="0 0 15 0"><path d="M12" /></svg>';
            const colors = parseForColors(await parse(svg));

            expect(generateColorPropTypes(colors))
                .to.eq('');
        });
    });
});