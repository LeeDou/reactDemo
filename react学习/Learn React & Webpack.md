# Learn React & Webpack 

这是我学习react&webpack过程中总结的一篇文章，在这篇文章中我将以一个简单的示例来详细解释学习过程中所遇到的问题。

俗话说磨刀不误砍柴工，首先我们要做好准备工作

### 搭建所需环境

- 安装webpack

    首先应该安装好 nodejs,以及安装好npm包管理工具，相信你肯定已经安装好了，在此就不再赘述

  ​    npm install webpack -g

  ​    -g 表示全局安装，webpack-dev-server 是一个web服务器

  ​    npm install webpack-dev-server -g

  ​

- webpack 配置文件

   webpack 用一个名为webpack.config.js 的配置文件，现在在你的项目的根目录下创建该文件。

  [文件目录][01.jpg]

  ```
  var path = require('path');

  module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    }
  }
  ```

  创建app.js ,build/index.html,运行打包

  ​

- 配置 package.json

   在根目录下 运行 npm init -y 会按照默认设置生成 package.json,修改scripts的键值：

  ```
  "scripts": {
    "start": "webpack-dev-server",
    "build": "webpack"
  }
  ```

- 安装依赖

   安装React：

   ` npm install react react-dom --save`

   还可以安装jQuery以简化Ajax代码：

   ` npm install jquery --save`

   安装Babel 的loader 以支持ES6语法

   ` npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev `

   配置 webpack.config.js 来使用安装的loader。

   ```
  // webpack.config.js

  var path = require('path');

  module.exports = {
    entry: path.resolve(__dirname, 'app/app.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015','react']
        }
      },
      ]
    }
  };
   ```

  ​

### 现在开始写一个组件

- 组件包括：
  - NewsList :所有组件的容器
  - NewsHeader: logo,标题，导航航栏
  - NewsItem: 对应每条资讯
- 把这些组件组成为一棵树
  - NewsList
    - NewsHeader
    - NewsItem *N

### 编写模板

编辑 NewsHeader.js

```
// NewsHeader.js

import React from 'react';

export default class NewsHeader extends React.Component {
  render() {
    return (
        <div className="newsHeader">
          I am NewsHeader.
        </div>
        );
  }
}
```

编辑 NwesItem.js

```
// NewsItem.js

import React from 'react';

export default class NewsItem extends React.Component {
  render() {
    return (
        <div className="newsItem">
          I am NewsItem.
        </div>
        );
  }
}
```

编辑 NewsList.js

```
// NewsList.js

import React from 'react';
import NewsHeader from './NewsHeader.js';
import NewsItem from './NewsItem.js';

export default class NewsList extends React.Component {
  render() {
    return (
        <div className="newsList">
          <NewsHeader />
          <NewsItem />
        </div>
        );
  }
}
```

最后修改入口文件 app.js

```
// app.js

import React from 'react'
import { render } from 'react-dom';
import $ from 'jquery';
import NewsList from './NewsList.js';

render(<NewsList />, $('#content')[0]);
```



最后逐个写每个组件

#### NewsHeader

1. logo和标题

    ```
   export default class NewsHeader extends React.Component {
   	getLogo() {
    	return (
         <div className="newsHeader-logo">
           <a href="https://news.ycombinator.com/"><img src="PATH_TO_IMAGE" /></a>
         </div>
      	 );
   	}
       getTitle() {
        return (
            <div className="newsHeader-title">
              <a className="newsHeader-textLink" href="https://news.ycombinator.com/">Hacker News</a>
            </div>
            );
       }

       render() {
        return (
            <div className="newsHeader">
              {this.getLogo()}
              {this.getTitle()}
            </div>
            );
       }
   }
    ```

   这里我们会发现img src ,在之前的时候我们引入js文件是通过import，src也类似，这就是ES6的模块系统。如果logo图片也要被模块化引入，这就需要我们再次配置webpack。

   安装对应的loader：

   ` npm install url-loader file-loader --save-dev`

   配置webpack.config.js

   ```
   //...

    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015','react']
      }
    },
    {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
    }
    ]

   //...
   ```

   回到Newsheader.js,使用import 引入图片

   ` import imagelogo from './y18.gif'`

   然后使用

   ` <img src={imagelogo}`

   最后需要添加样式，当然样式也需要模块化引入，安装相应的loader

   ` npm install css-loader style-loader --save-dev`

     css-loader 处理的是css文件中的URL() 表达式

     style-loader 将css代码插入到页面中的style标签中

   在webpack.config.js 中配置新的loader

   ```
   {
     test: /\.css$/,
     loader: 'style-loader!css-loader'
   }
   ```

   > 注意： loader中css后必须跟-loader，这是webpack2.0版本和以前版本的区别，若未写就无法引入css-loader 模块

   新建css文件 NewsHeader.css

   ```
   .newsHeader {
    align-items: center;
    background: #ff6600;
    color: black;
    display: flex;
    font-size: 10pt;
    padding: 2px;
   }

   .newsHeader-logo {
    border: 1px solid white;
    flex-basis: 18px;
    height: 18px;
   }

   .newsHeader-textLink {
    color: black;
    text-decoration: none;
   }

   .newsHeader-title {
    font-weight: bold;
    margin-left: 4px;
   }
   ```

   然后在NewsHeader.js 中引入它

   ` import './NewsHeader.css';`

   再键一个全局的css文件 app.css

   ```
   body{
     font-family: Verdana, sans-serif;
   }
   ```

   然后在 app.js 中引入

   ` import './app.js'`

   > 注意 : 我发现写的css样式并没有正确的渲染到页面上，就开始寻找其原因，发现所有的class样式名称出现乱码， 标签符都能正确编码。我开始寻找解决问题的方法。。。
   >
   > 发现若和js 引入文件一样，赋予css文件名称，并以变量属性的方式写入就可以解决编码的乱码问题，

   如下更改NewsHeader.js

   ` import style from './NewsHeader.css';`

   在每个组件的快中更改样式写法

   ` <div className={style.newsHeader}>`

   这样就解决了webpack打包后的乱码问题

   > 个人认为应该还有其他的方式解决css 的直接引入问题，我将在以后的学习中持续寻找解决办法


2. 导航栏 接下来就是导航栏

    回到NewsHeader.js ，增加一个getNav 方法

   ```
   getNav() {
    var navLinks = [
    {
      name: 'new',
      url: 'newest'
    },
    {
      name: 'comments',
      url: 'newcomments'
    },
    {
      name: 'show',
      url: 'show'
    },
    {
      name: 'ask',
      url: 'ask'
    },
    {
      name: 'jobs',
      url: 'jobs'
    },
    {
      name: 'submit',
      url: 'submit'
    }
    ];

    return (
        <div className="newsHeader-nav">
          {
            navLinks.map(function(navLink) {
              return (
                  <a key={navLink.url} className="newsHeader-navLink newsHeader-textLink" href={"https://news.ycombinator.com/" + navLink.url} >
                    {navLink.name}
                  </a>
                  );
            })
          }
        </div>
        );
   }
   ```

   >  写到这里，我编译时发现了一个问题。就是在编译完成后，写的css样式中的class名称出现编译后的乱码问题。然后通过不断地学习寻找出了两种解决方法：
   >
   > ` import style from '!style-loader!css-loader!./NewsHeader.css';`
   >
   > 另外的一种就是require方法
   >
   > ` require( '!style-loader!css-loader!./NewsHeader.css');`
   >
   > 可以发现，这和以前的写法最主要区别是加入了!style-loader!css-loader!这一段实现css文件的正常引入

3. 登录入口

    增加一个 getLogin 方法

   ```
   getLogin() {
    return (
        <div className="newsHeader-login">
          <a className="newsHeader-textLink" href="https://news.ycombinator.com/login?goto=news">login</a>
        </div>
        );
   }
   ```

   在render 中引入

   ```
   render() {
    return (
        <div className="newsHeader">
          {this.getLogo()}
          {this.getTitle()}
          {this.getNav()}
          {this.getLogin()}
        </div>
        );
   }
   ```



### NewsItem

1. NewsItem 标题

    修改 NewsList.js

   ```
   render() {
    var testData = {
      "by" : "bane",
      "descendants" : 49,
      "id" : 11600137,
      "kids" : [ 11600476, 11600473, 11600501, 11600463, 11600452, 11600528, 11600421, 11600577, 11600483 ],
      "score" : 56,
      "time" : 1461985332,
      "title" : "Yahoo's Marissa Mayer could get $55M in severance pay",
      "type" : "story",
      "url" : "http://www.latimes.com/business/technology/la-fi-0429-tn-marissa-mayer-severance-20160429-story.html"
    };

    return (
        <div className="newsList">
          <NewsHeader />
          <NewsItem item={testData} rank={1} />
        </div>
        );
   }
   ```

   修改 NewsItem.js

   ```
   render: function () {
    return (
      <div className="newsItem">
        <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
      </div>
    );
   }
   ```

   建立NewsItem.css

   ```
   .newsItem {
    color: #828282;
    margin-top: 5px;
    align-items: baseline;
    display: flex;  
   }

   .newsItem-titleLink {
    color: black;
    font-size: 10pt;
    text-decoration: none;
   }
   ```

   在 NewsItem.js 中引入

   ` import '!style!css!./NewsItem.css'`

   NewsItem 来源地址，把来源地址添加到标题末尾，先引入 url 模块

   ` import URL from  'url'`

   然后增加一个getDomain 方法

   ```
   getDomain() {
    return URL.parse(this.props.item.url).hostname;
   }

   ```

    然后再增加一个 `getTitle` 方法, 这个方法会返回一个包含了标题(我们上一节做的事)和地址的组件.

   ```
   getTitle() {
    return (
        <div className="newsItem-title">
          <a className="newsItem-titleLink" href={this.props.item.url}>{this.props.item.title}</a>
          <span className="newsItem-domain"><a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a></span>
        </div>
        );
   }
   ```

   修改render

   ```
   render() {
    return (
        <div className="newsItem">
          <div className="newsItem-itemText">
            {this.getTitle()}
          </div>
        </div>
        );
   }
   ```

   增加样式

   ```
   .newsItem-itemText {
    flex-grow: 1;
   }

   .newsItem-domain {
    font-size: 8pt;
    margin-left: 5px;
   }

   .newsItem-domain > a {
    color: #828282;
    text-decoration: none;
   }
   ```

   增加getTitle()方法

   ```
   getTitle() {
    return (
        <div className="newsItem-title">
          <a className="newsItem-titleLink" href={this.props.item.url ? this.props.item.url : 'https://news.ycombinator.com/item?id=' + this.props.item.id}>{this.props.item.title}</a>
          {
            this.props.item.url && <span className="newsItem-domain"><a href={'https://news.ycombinator.com/from?site=' + this.getDomain()}>({this.getDomain()})</a></span>
          }
        </div>
        );
   }
   ```

   NewsItem.js 其余部分

   ` import ImageGrayArrow from './grayarrow.gif';`

   ```
   getCommentLink() { // 评论链接
    var commentText = 'discuss';
    if(this.props.item.kids && this.props.item.kids.length) {
      commentText = this.props.item.kids.length + ' comment';
    }

    return (
        <a href={'https://news.ycombinator.com/item?id=' + this.props.item.id}>{commentText}</a>
        );
   }

   getSubtext() { // 分数, 作者, 时间, 评论数
    return (
        <div className="newsItem-subtext">
          {this.props.item.score} points by <a href={'https://news.ycombinator.com/user?id=' + this.props.item.by}>{this.props.item.by}</a> {Moment.utc(this.props.item.time * 1000).fromNow()} | {this.getCommentLink()}
        </div>
        );
   }

   getRank() { // 序号
    return (
        <div className="newsItem-rank">
          {this.props.rank}.
        </div>
        );
   }

   getVote() { // 投票
    return (
        <div className="newsItem-vote">
          <a href={'https://news.ycombinator.com/vote?for='+ this.props.item.id + '&dir=up&goto=news'}>
            <img src={ImageGrayArrow} width="10" />
          </a>
        </div>
        );
   }

   render() {
    return (
        <div className="newsItem">
          {this.getRank()}
          {this.getVote()}
          <div className="newsItem-itemText">
            {this.getTitle()}
            {this.getSubtext()}
          </div>
        </div>
        );
   }
   ```

   NewsItem.css

   ```
   .newsItem-rank {
    flex-basis: 25px;
    font-size: 10pt;
    text-align: right;
   }

   .newsItem-vote {
    flex-basis: 15px;
    text-align: center;
   }

   .newsItem-subtext {
    font-size: 7pt;
   }

   .newsItem-subtext > a {
    color: #828282;
    text-decoration: none;
   }

   .newsItem-subtext > a:hover {
    text-decoration: underline;
   }
   ```

   修改render

   ```
   render() {
       return (
           <div className="newsList">
             <NewsHeader />
             <div className="newsList-newsItem">
               {
                 (this.props.items).map(function(item, index) {
                   return (
                       <NewsItem key={item.id} item={item} rank={index+1} />
                       );
                 })
               }
             </div>
           </div>
           );
     }
   ```

   新建样式NewsList.css

   ```
   .newsList {
     background: #f6f6ef;
     margin-left: auto;
     margin-right: auto;
     width: 85%;
   }
   ```



### Hacker News API 

使用Hacker News API 来获取数据

aap.js

```
function get(url) {
  return Promise.resolve($.ajax(url));
}

get('https://hacker-news.firebaseio.com/v0/topstories.json').then( function(stories) {
  return Promise.all(stories.slice(0, 30).map(itemId => get('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json')));
}).then(function(items) {
  render(<NewsList items={items} />, $('#content')[0]);
}).catch(function(err) {
  console.log('error occur', err);
});
```

