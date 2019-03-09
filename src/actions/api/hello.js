import context from './context';
import HttpMethod from '../utils/HttpMethod';

const hellos = [{
        name: "sayHello",
        method: HttpMethod.GET,
        url: `${context.hello}`
    }, //    获取角色信息
];

export default hellos;