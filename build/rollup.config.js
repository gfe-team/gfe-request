import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import pkg from '../package.json'
const deps = Object.keys(pkg.dependencies)
const vue = require('rollup-plugin-vue')
import postcss from 'rollup-plugin-postcss'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'

export default [
  {
    input: path.resolve(__dirname, '../packages/index.ts'),
    output: [
      {
        format: 'es',
        file: pkg.module,
      }
    ],
    plugins: [
      json(),
      terser(),
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      }),
      // commonjs(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          tsconfig: "/tsconfig.json",
          'include': [
            'packages/**/*',
            'typings/shims-vue.d.ts',
          ],
          'exclude': [
            'node_modules',
            'packages/**/__tests__/*',
          ],
        },
        abortOnError: false,
      }),
      postcss({
        // 把 css 插入到 style 中
        // inject: true,
        // 把 css 放到和js同一目录
        extract: true
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'runtime',
        // 使用预设
        presets: [['@babel/preset-env', {
          "modules": false,
          "useBuiltIns": "usage",
          'corejs': 3
        }]],
        plugins: [
          //  多次导入的文件，只导入一次
          ['@babel/plugin-transform-runtime']]
      })
    ],
    external (id) {
      return /^vue/.test(id)
        || deps.some(k => new RegExp('^' + k).test(id)) || /^core-js/.test(id)
    },
  },
]
