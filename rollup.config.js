import typescript from 'rollup-plugin-typescript'
import prettier from 'rollup-plugin-prettier'

const plugins = [
    typescript({
      typescript: require('typescript'),
      declaration: true
    }),
  prettier({
    singleQuote: true,
    parser: 'typescript'
  })
]
const external = ['node-fetch']

export default [
  // {
  //   input: './index.ts',
  //   output: { format: 'esm', file: './index.mjs' },
  //   plugins,
  //   external
  // },
  // {
  //   input: './memo.ts',
  //   output: { format: 'esm', file: './memo.mjs' },
  //   plugins,
  //   external
  // },
  {
    input: './airtable.ts',
    output: { format: 'esm', file: './airtable.mjs' },
    plugins,
    external
  },
  // {
  //   input: './async.ts',
  //   output: { format: 'esm', file: './async.mjs' },
  //   plugins,
  //   external
  // }
]
