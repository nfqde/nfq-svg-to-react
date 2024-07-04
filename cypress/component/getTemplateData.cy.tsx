/* eslint-disable @nfq/no-magic-numbers */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import {parse} from 'svgson';

import {getTemplateData} from '../../src/utils/templateData';
import {removeSvgTag} from '../../src/utils/utils';

describe('templateData.ts', () => {
    context('getTemplateData', () => {
        before(() => {
            expect(getTemplateData, 'getTemplateData').to.be.a('function');
        });

        it('Should get the right data length if typescript', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('typescript', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData).to.be.an('array');
            expect(templateData).to.have.lengthOf(7);
        });

        it('Should get the right data length if typescript-pre19', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('typescript-pre19', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData).to.be.an('array');
            expect(templateData).to.have.lengthOf(8);
        });

        it('Should get the right data length if jsdoc-typescript', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('jsdoc-typescript', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData).to.be.an('array');
            expect(templateData).to.have.lengthOf(7);
        });

        it('Should get the right data length if legacy', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('legacy', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData).to.be.an('array');
            expect(templateData).to.have.lengthOf(8);
        });

        it('Should have the right regexes for typescript', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('typescript', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData[0]).to.be.an('object');
            expect(templateData[0].search).to.be.deep.eq(/\{\{%name%\}\}/gu);
            expect(templateData[1]).to.be.an('object');
            expect(templateData[1].search).to.be.deep.eq(/\{\{%svg%\}\}/gu);
            expect(templateData[2]).to.be.an('object');
            expect(templateData[2].search).to.be.deep.eq(/\{\{%height%\}\}/gu);
            expect(templateData[3]).to.be.an('object');
            expect(templateData[3].search).to.be.deep.eq(/\{\{%width%\}\}/gu);
            expect(templateData[4]).to.be.an('object');
            expect(templateData[4].search).to.be.deep.eq(/\{\{%colors%\}\}/gu);
            expect(templateData[5]).to.be.an('object');
            expect(templateData[5].search).to.be.deep.eq(/\{\{%colorDocs%\}\}/gu);
            expect(templateData[6]).to.be.an('object');
            expect(templateData[6].search).to.be.deep.eq(/\{\{%colorTypes%\}\}/gu);
        });

        it('Should have the right regexes for typescript-pre19', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('typescript-pre19', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData[0]).to.be.an('object');
            expect(templateData[0].search).to.be.deep.eq(/\{\{%name%\}\}/gu);
            expect(templateData[1]).to.be.an('object');
            expect(templateData[1].search).to.be.deep.eq(/\{\{%svg%\}\}/gu);
            expect(templateData[2]).to.be.an('object');
            expect(templateData[2].search).to.be.deep.eq(/\{\{%height%\}\}/gu);
            expect(templateData[3]).to.be.an('object');
            expect(templateData[3].search).to.be.deep.eq(/\{\{%width%\}\}/gu);
            expect(templateData[4]).to.be.an('object');
            expect(templateData[4].search).to.be.deep.eq(/\{\{%colorDefaultProps%\}\}/gu);
            expect(templateData[5]).to.be.an('object');
            expect(templateData[5].search).to.be.deep.eq(/\{\{%colors%\}\}/gu);
            expect(templateData[6]).to.be.an('object');
            expect(templateData[6].search).to.be.deep.eq(/\{\{%colorDocs%\}\}/gu);
            expect(templateData[7]).to.be.an('object');
            expect(templateData[7].search).to.be.deep.eq(/\{\{%colorTypes%\}\}/gu);
        });

        it('Should have the right regexes jsdoc-typescript', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('jsdoc-typescript', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData[0]).to.be.an('object');
            expect(templateData[0].search).to.be.deep.eq(/\{\{%name%\}\}/gu);
            expect(templateData[1]).to.be.an('object');
            expect(templateData[1].search).to.be.deep.eq(/\{\{%svg%\}\}/gu);
            expect(templateData[2]).to.be.an('object');
            expect(templateData[2].search).to.be.deep.eq(/\{\{%height%\}\}/gu);
            expect(templateData[3]).to.be.an('object');
            expect(templateData[3].search).to.be.deep.eq(/\{\{%width%\}\}/gu);
            expect(templateData[4]).to.be.an('object');
            expect(templateData[4].search).to.be.deep.eq(/\{\{%colorDefaultProps%\}\}/gu);
            expect(templateData[5]).to.be.an('object');
            expect(templateData[5].search).to.be.deep.eq(/\{\{%colors%\}\}/gu);
            expect(templateData[6]).to.be.an('object');
            expect(templateData[6].search).to.be.deep.eq(/\{\{%colorsDocs%\}\}/gu);
        });

        it('Should have the right regexes for legacy', async () => {
            const svgData = `<svg height="15" viewbox="0 0 15 0+">
                <path fill="#000000" stroke="#FF0000" d="M12" />
                <path fill="#00FF00" stroke="#0000FF" d="M12" />
                <path fill="#FFFF00" stroke="#FFFFFF" d="M12" />
            </svg>`;
            const svg = removeSvgTag(svgData);
            const svgJson = await parse(svgData);
            const templateData = getTemplateData('legacy', {
                file: '../test/hello-test.svg',
                HAST: svgJson,
                svg
            });

            expect(templateData[0]).to.be.an('object');
            expect(templateData[0].search).to.be.deep.eq(/\{\{%name%\}\}/gu);
            expect(templateData[1]).to.be.an('object');
            expect(templateData[1].search).to.be.deep.eq(/\{\{%svg%\}\}/gu);
            expect(templateData[2]).to.be.an('object');
            expect(templateData[2].search).to.be.deep.eq(/\{\{%height%\}\}/gu);
            expect(templateData[3]).to.be.an('object');
            expect(templateData[3].search).to.be.deep.eq(/\{\{%width%\}\}/gu);
            expect(templateData[4]).to.be.an('object');
            expect(templateData[4].search).to.be.deep.eq(/\{\{%colorDefaultProps%\}\}/gu);
            expect(templateData[5]).to.be.an('object');
            expect(templateData[5].search).to.be.deep.eq(/\{\{%colors%\}\}/gu);
            expect(templateData[6]).to.be.an('object');
            expect(templateData[6].search).to.be.deep.eq(/\{\{%colorDocs%\}\}/gu);
            expect(templateData[7]).to.be.an('object');
            expect(templateData[7].search).to.be.deep.eq(/\{\{%colorPropTypes%\}\}/gu);
        });
    });
});