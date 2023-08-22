/* eslint-disable @typescript-eslint/no-unsafe-call */
import coverage from '@cypress/code-coverage/task';
import {defineConfig} from 'cypress';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

import type {Configuration} from 'webpack';

export default defineConfig({
    component: {
        devServer: {
            bundler: 'webpack',
            framework: 'react',
            /**
             * The webpack configuration to use when bundling your components.
             *
             * @returns Webpack configuration.
             */
            webpackConfig() {
                const config: Configuration = {
                    module: {
                        rules: [
                            {
                                test: /\.(js|jsx|ts|tsx)$/u,
                                use: {loader: 'babel-loader'}
                            },
                            {
                                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/u,
                                type: 'asset/resource'
                            }
                        ]
                    },
                    plugins: [new NodePolyfillPlugin()],
                    resolve: {
                        extensions: [
                            '.js',
                            '.jsx',
                            '.ts',
                            '.tsx',
                            '.css',
                            '.png',
                            '.jpeg',
                            '.jpg',
                            '.json',
                            '.svg'
                        ],
                        fallback: {fs: false}
                    },
                    target: 'web'
                };

                return config;
            }
        },
        env: {NODE_ENV: 'test'},
        reporter: 'mochawesome',
        reporterOptions: {
            html: false,
            json: true,
            overwrite: false,
            reportDir: 'cypress/reports'
        },
        video: false,
        videoUploadOnPasses: false,
        /**
         * Sets up plugins and so on.
         *
         * @param on     Cypress event handler.
         * @param config Cypress configuration.
         * @returns Cypress configuration.
         */
        setupNodeEvents(on, config) {
            coverage(on, config);

            return config;
        }
    },
    video: false,
    videoUploadOnPasses: false
});