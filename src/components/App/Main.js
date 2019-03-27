// eslint-disable-next-line prefer-object-spread
import {React, Component} from 'react';

import {Layout} from 'antd';

import api from '../../actions/api/index';

const {Header, Content, Footer, Sider, SliderRight} = Layout;

class Main extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="layout">
        <Header style={{color: 'red', }}>
          Header
        </Header>
        <Content style={{padding: '0 50px'}}>
          Content
          <Sider width={350} style={{background: '#fff'}}>
            <SliderRight />
          </Sider>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          一斗水 ©2018 Created by 一斗水
        </Footer>
      </Layout>
    );
  }

  handClick() {
    api.hello.sayHello().then((data) => {
      console.log(data.data);
      alert(data.data.hello);
    });
  }
}

export default Main;
