import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import api from '../../actions/api/index';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Layout>
        <Button type="large" style={{background : 'gray'}} onClick={this.handClick}>Hello</Button>
      </Layout>
    )
  }

  handClick() {
    api.hello.sayHello().then((data) => {
      console.log(data.data);
      alert(data.data.hello);
    });
  }

}


export default Main;
