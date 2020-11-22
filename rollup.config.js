import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const MAIN = 'src/index.js';
const MAIN_OPERATORS = 'src/operators/index.js';

export default [
  // ES5
  {
    input: MAIN,
    output: {
      file: 'build/cjs/index.js',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [resolve(), babel()],
    external: {
      ...pkg.dependencies,
    },
  },

  // ES5
  {
    input: MAIN_OPERATORS,
    output: {
      file: 'build/cjs/operators/index.js',
      format: 'cjs',
    },
    plugins: [resolve(), babel()],
    external: {
      ...pkg.dependencies,
    },
  },

  // BROWSER
  {
    input: MAIN,
    output: [
      {
        file: 'build/browser/index.js',
        sourcemap: true,
        format: 'iife',
        name: 'pubsub',
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            plugins: ['@babel/transform-runtime'],
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: ['> 1%', 'last 2 versions'] } },
              ],
            ],
          }),
          terser(),
        ],
      },
    ],
  },

  // BROWSER
  {
    input: MAIN_OPERATORS,
    output: [
      {
        file: 'build/browser/operators.js',
        sourcemap: true,
        format: 'iife',
        name: 'operators',
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            plugins: ['@babel/transform-runtime'],
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: ['> 1%', 'last 2 versions'] } },
              ],
            ],
          }),
          terser(),
        ],
      },
    ],
  },
];
