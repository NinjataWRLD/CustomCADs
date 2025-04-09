import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getEslintConfig } from './eslint-configs/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = getEslintConfig(__dirname);
export default eslintConfig;
