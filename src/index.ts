import AutoUpdater from 'cli-autoupdate';
import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

// eslint-disable-next-line import/extensions
import pkg from '../package.json' assert { type: 'json' };

import {convertSvgToReact} from './convertSvgToReact';

import type {OptionDefinition, Section} from 'command-line-usage';

const updater = new AutoUpdater(pkg);

const optionsList: OptionDefinition[] = [
    {
        alias: 'h',
        description: 'Displays this help guide.',
        name: 'help',
        type: Boolean
    },
    {
        alias: 't',
        defaultValue: 'typescript',
        description: `The generation type has to be one of the following options
        ['typescript', 'jsdoc-typescript', 'legacy'].`,
        name: 'template',
        type: String,
        typeLabel: '{underline Enum}'
    },
    {
        defaultOption: true,
        description: 'The input directory or file.',
        name: 'src',
        type: String,
        typeLabel: '<files|folder>'
    },
    {
        alias: 'o',
        description: 'The output directory.',
        name: 'out',
        type: String,
        typeLabel: '<folder>'
    }
];

const definition: Section[] = [
    {
        content: 'Generate React.js components from svg files.',
        header: 'Svg to React.js'
    },
    {
        header: 'Options',
        optionList: optionsList
    }
];

updater.on('finish', () => {
    const options = commandLineArgs(optionsList);

    if (options.help) {
        const help = commandLineUsage(definition);

        process.stdout.write(help);
        process.exit(0);
    } else if (!options.out || !options.src || !options.template) {
        process.stderr.write('Missing required options!');
        const help = commandLineUsage(definition);

        process.stdout.write(help);
        process.exit(1);
    } else {
        void convertSvgToReact(options);
    }
});