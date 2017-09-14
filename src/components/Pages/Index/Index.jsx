import React from 'react';
import Header from './Header/Header';
import MyContent from './Contents/MyContent';
import Footer from './Footer/Footer';
import TabList from './Tab/TabList';

import './Index.less';

const json4fe = ____json4fe;
const browser = json4fe.browser;
const userInfo = json4fe.user ? JSON.parse(json4fe.user) : {};

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return <div>
      <Header nickName={userInfo.nickName}
        userLogo={userInfo.headUrl}
        answerCount={userInfo.answerCount}
        praiseCount={userInfo.praiseCount} />
      {browser === "zhuzhan" ? <TabList browser={browser} /> : <Footer />}
      <MyContent />
    </div>

  }
}
