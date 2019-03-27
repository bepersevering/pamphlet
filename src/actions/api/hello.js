import HttpMethod from '../utils/HttpMethod';

import context from './context';

const hellos = [
  {
    name:   'sayHello',
    method: HttpMethod.GET,
    url:    `${context.hello}`
  }, //    获取角色信息
];

export default hellos;
