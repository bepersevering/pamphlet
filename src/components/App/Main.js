import React, {Component} from 'react';

import {Layout, Menu, Icon, Button} from 'antd';

import api from '../../actions/api/index';

import './Main.scss';

const {Header, Content, Footer, Sider} = Layout;

class Main extends Component {
  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          Header
        </Header>
        <Content className="App-content">
          Content
        </Content>
        <Footer>
          一斗水 ©2018 Created by 一斗水
        </Footer>
      </Layout>
    );
  }

  handClick() {
    api.hello.sayHello().then((data) => {
      console.log(data.data);
    });
  }
}

export default Main;
