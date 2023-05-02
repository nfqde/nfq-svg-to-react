/* eslint-disable array-func/prefer-array-from */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import shebang from 'rollup-plugin-add-shebang';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';

// eslint-disable-next-line import/extensions
import pkg from './package.json' assert { type: "json" };

const globals = {};

export default [
    {
        external: [...Object.keys({
            ...pkg.peerDependencies,
            ...pkg.externals
        } || {})],
        input: 'src/index.ts',
        output: [
            {
                file: pkg.bin.svgToReact,
                format: 'cjs',
                globals,
                interop: 'auto',
                name: pkg.name,
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({targets: ['./dist/']}),
            resolve({extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']}),
            commonjs({include: ['node_modules/**']}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
            }),
            shebang({include: pkg.bin.svgToReact}),
            copy({
                targets: [
                    {
                        dest: 'dist/templates',
                        src: 'src/templates/**/*'
                    }
                ]
            })
        ]
    }
];