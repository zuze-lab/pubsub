import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import bundlesize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';

const MAIN = 'src/index.js';
const MAIN_NAME = 'pubsub';
const MAIN_OPERATORS = 'src/operators/index.js';
const MAIN_OPERATORS_NAME = 'pubsubOperators';

export default [
  {
    input: MAIN,
    output: {
      file: 'build/index.js',
      format: 'cjs',
      name: MAIN_NAME,
      exports: 'default',
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      bundlesize(),
    ],
  },

  {
    input: MAIN_OPERATORS,
    output: {
      file: 'build/operators.js',
      format: 'cjs',
      name: MAIN_OPERATORS_NAME,
    },
    plugins: [
      resolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      bundlesize(),
    ],
  },

  // BROWSER
  {
    input: MAIN,
    output: [
      {
        file: 'browser.js',
        sourcemap: true,
        format: 'iife',
        name: MAIN_NAME,
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: ['> 1%', 'last 2 versions'] } },
              ],
            ],
          }),
          terser(),
          bundlesize(),
        ],
      },
    ],
  },

  // BROWSER
  {
    input: MAIN_OPERATORS,
    output: [
      {
        file: 'operators.js',
        sourcemap: true,
        format: 'iife',
        name: MAIN_OPERATORS_NAME,
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: ['> 1%', 'last 2 versions'] } },
              ],
            ],
          }),
          terser(),
          bundlesize(),
        ],
      },
    ],
  },
];
