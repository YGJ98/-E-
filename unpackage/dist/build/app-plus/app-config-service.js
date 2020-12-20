
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/trends/trends","pages/news/news","pages/my/my","pages/home-search/home-search","pages/home-add/home-add","pages/user-info/user-info","pages/user-opinion/user-opinion"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"borderStyle":"black","color":"#B5B5B5","selectedColor":"#FEDE33","list":[{"text":"社区","pagePath":"pages/index/index","iconPath":"static/tabBar/community.png","selectedIconPath":"static/tabBar/communited.png"},{"text":"动态","pagePath":"pages/trends/trends","iconPath":"static/tabBar/dynamic.png","selectedIconPath":"static/tabBar/dynamiced.png"},{"text":"消息","pagePath":"pages/news/news","iconPath":"static/tabBar/new.png","selectedIconPath":"static/tabBar/news.png"},{"text":"我的","pagePath":"pages/my/my","iconPath":"static/tabBar/my.png","selectedIconPath":"static/tabBar/myed.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"小E","compilerVersion":"2.9.7","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"社区","navigationStyle":"custom"}},{"path":"/pages/trends/trends","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态","enablePullDownRefresh":false}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#FEDE33"}},{"path":"/pages/home-search/home-search","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/home-add/home-add","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/user-info/user-info","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/user-opinion/user-opinion","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
