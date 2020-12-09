import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import bundlesize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';

const MAIN = 'src/index.js';
const MAIN_NAME = 'pubsub';
const MAIN_OPERATORS = 'src/operators/index.js';
const MAIN_OPERATORS_NAME = 'pubsubPipe';

export default [
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
