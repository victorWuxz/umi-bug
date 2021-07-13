# 飞轮

安装依赖

```bash
$ npm install --registry=http://npm.baijia.com
```

本地启动（本地mock）：

```bash
$ npm start
```

本地启动（代理至yapi）：

```bash
$ npm run start:yapi
```

本地启动（代理至test）：

```bash
$ npm run start:test
```

代理启动（自动获取token）：

cas登陆的系统联调需要去浏览器手动复制token，该配置可节省此步骤

借助于getCasToken工具，一件自动获取token，需要修改项目根目录下的gct.config.js文件，具体可参考：https://npm.baijia.com/-/web/detail/get-cas-token

```bash
$ npm run proxy
```

构建
```bash
$ npm run build:test
$ npm run build:beta
$ npm run build:prod
```
