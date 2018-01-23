import {writeFile, expectFileToExist, expectFileToMatch} from '../../utils/fs';
import {ng} from '../../utils/process';
import {updateJsonFile} from '../../utils/project';
import {expectToFail} from '../../utils/utils';


export default function() {
  // TODO(architect): reenable, validate, then delete this test. It is now in devkit/build-webpack.
  return;

  return writeFile('src/assets/.file', '')
    .then(() => writeFile('src/assets/test.abc', 'hello world'))
    .then(() => ng('build'))
    .then(() => expectFileToExist('dist/favicon.ico'))
    .then(() => expectFileToExist('dist/assets/.file'))
    .then(() => expectFileToMatch('dist/assets/test.abc', 'hello world'))
    .then(() => expectToFail(() => expectFileToExist('dist/assets/.gitkeep')))
    // doesn't break beta.16 projects
    .then(() => updateJsonFile('.angular-cli.json', configJson => {
      const app = configJson['apps'][0];
      app['assets'] = 'assets';
    }))
    .then(() => expectFileToExist('dist/assets/.file'))
    .then(() => expectFileToMatch('dist/assets/test.abc', 'hello world'));
}