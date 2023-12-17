<div id="top"></div>

# @nfq/svg-to-react

[![EsLint](https://github.com/nfqde/nfq-svg-to-react/actions/workflows/eslint.yml/badge.svg)](https://github.com/nfqde/nfq-svg-to-react/actions/workflows/eslint.yml)

---

1. [Description](#description)
2. [Getting started](#getting-started)
    1. [Installation](#installation)
3. [Usage](#usage)
4. [Props](#props)
5. [Support](#support)

---

## Description: [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project, `@nfq/svg-to-react`, is a powerful tool that allows you to convert SVG images into React components. It's built with Node.js and TypeScript. The main functionality of this package is to take a directory or a file of SVG images as input, and output a directory of React components. This is particularly useful for projects where SVG images are used extensively and need to be managed efficiently.
The package provides a command line interface for easy use. It also supports different templates for generation, including 'typescript', 'jsdoc-typescript', and 'legacy'. This allows you to choose the format that best suits your project's needs.

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Getting started

To the package follow the next steps:

### Installation

To install the package run
```sh
npm install -g <Project name>
```
if you are on yarn
```sh
yarn add --global <Project name>
```
or on pnpm
```sh
pnpm install -g <Project name>
```

---

## Usage

You can use this package to convert SVG files to React components. You can specify the input directory or file, the output directory, and the template to use for generation. The available templates are 'typescript', 'jsdoc-typescript', and 'legacy'.

For example, to convert all SVG files in the `icons` directory and output them as TypeScript React components in the `components` directory, you would use the following command:

```sh
svgToReact --src ./icons --out ./components --template typescript
```

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Props

This package provides a command line interface with the following options:

- `src`: The input directory or file.
- `out`: The output directory.
- `template`: The generation type. It has to be one of the following options: ['typescript', 'jsdoc-typescript', 'legacy'].

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Support

Christoph Kruppe - [https://github.com/ckruppe] - c.kruppe@nfq.de  

<p align="right">(<a href="#top">back to top</a>)</p>