import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import bundlesize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const MAIN = 'src/index.js';
const MAIN_NAME = 'pubsub';
const MAIN_OPERATORS = 'src/operators/index.js';
const MAIN_OPERATORS_NAME = 'pubsubPipe';

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
      copy({
        targets: [{ src: './src/index.d.ts', dest: 'build' }],
      }),
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
      file: 'build/operators/index.js',
      format: 'cjs',
      name: MAIN_OPERATORS_NAME,
    },
    plugins: [
      copy({
        targets: [
          {
            src: './src/operators/index.d.ts',
            dest: 'build/operators',
          },
        ],
      }),
      resolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      bundlesize(),
    ],
  },

  {
    input: MAIN,
    output: {
      file: 'build/esm/operators/index.js',
      format: 'esm',
      name: MAIN_NAME,
    },
    plugins: [
      copy({
        targets: [
          {
            src: './src/operators/index.d.ts',
            dest: 'build/esm/operators',
          },
        ],
      }),
      resolve(),
      babel({
        babelHelpers: 'runtime',
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
      }),
      bundlesize(),
    ],
  },

  {
    input: MAIN,
    output: {
      file: 'build/esm/index.js',
      format: 'esm',
      name: MAIN_NAME,
    },
    plugins: [
      copy({
        targets: [
          {
            src: './src/index.d.ts',
            dest: 'build/esm',
          },
        ],
      }),
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
        file: 'build/browser.min.js',
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
        file: 'build/pipe.js',
        sourcemap: true,
        format: 'iife',
        name: MAIN_OPERATORS_NAME,
        plugins: [
          getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['> 1.5%'] } }],
            ],
          }),
          terser(),
          bundlesize(),
        ],
      },
    ],
  },
];
