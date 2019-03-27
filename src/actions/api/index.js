import {generate} from '../utils/apiGenerator';

import article from './article';
import user from './user';
import hello from './hello';

const api = {
  article,
  user,
  hello
};

export default generate(api);
