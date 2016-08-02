import multiEntry from 'rollup-plugin-multi-entry';
import typescript from 'rollup-plugin-typescript';

export default {
  entry: [
    'src/**/*.ts'
  ],
  dest: 'dist/component.spec.js',
  plugins: [
    multiEntry(),
    typescript()
  ],
  format: 'iife',
  moduleName: 'tests'
};