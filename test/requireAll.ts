import * as path from 'path';
import glob from 'glob';

const PROJECT_ROOT = path.join(__dirname, '..');

glob.sync('src/**/*.{js,ts}', { cwd: PROJECT_ROOT })
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(path.join(PROJECT_ROOT, file));
  });
