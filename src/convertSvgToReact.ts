import {mkdir, readdir, readFile, writeFile} from 'fs/promises';
import path from 'path';

import {ESLint} from 'eslint';

import {getTemplateData} from './utils/templateData';
import {getComponentName, getSVGData} from './utils/utils';

import type {CommandLineOptions} from 'command-line-args';

interface SvgToReactOptions extends CommandLineOptions {
    out?: string;
    src?: string;
    template?: 'jsdoc-typescript' | 'legacy' | 'typescript';
}

/**
 * Convert SVG to React.js.
 *
 * @param options The command line options.
 */
export const convertSvgToReact = async (options: SvgToReactOptions) => {
    const {out, src, template} = options;
    let templateFile: string;
    let files = [];

    if (!out || !src || !template) {
        return;
    }

    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        templateFile = await readFile(path.join(__dirname, `templates/${template as string}.tpl`), 'utf-8');
    } catch (e) {
        process.stderr.write(`Template not found: ${template as string}.tpl`);

        return;
    }

    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        await mkdir(out, {recursive: true});
    } catch (e) {
        process.stderr.write('Could not create output folder!');

        return;
    }

    try {
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        files = await readdir(src);

        const conversions = files
            .filter(file => file.endsWith('.svg'))
            .map(async file => {
                await convertFile(path.join(src, file), out, templateFile, template);
            });

        await Promise.all(conversions);
    } catch (e) {
        files.push(src);
        await convertFile(src, out, templateFile, template);
    } finally {
        process.stdout.write(`Converted ${files.length} files.`);
        process.exit(0);
    }
};

/**
 * Convert a single file.
 *
 * @param file         The file to convert.
 * @param out          The output folder.
 * @param template     The template to use.
 * @param templateType The template type.
 */
const convertFile = async (file: string, out: string, template: string, templateType: string) => {
    const {HAST, svg} = await getSVGData(file);
    const templateData = getTemplateData(templateType, {
        file,
        HAST,
        svg
    });
    let svgComponent = template;

    templateData.forEach(({replace, search}) => {
        svgComponent = svgComponent.replace(search, replace);
    });

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    await writeFile(path.join(out, `${getComponentName(file)}.${templateType === 'typescript' ? 't' : 'j'}sx`), svgComponent);

    const eslint = new ESLint({fix: true});
    const results = await eslint.lintFiles(path.join(out, `${getComponentName(file)}.${templateType === 'typescript' ? 't' : 'j'}sx`));

    await ESLint.outputFixes(results);
};