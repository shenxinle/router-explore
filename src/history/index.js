class HistoryRouter {
  /**
   * @param routerConfig
   *    {index: () => {...}, ...}
   */
  constructor(routerConfig) {
    this.routers = routerConfig;
    this.listenPopState();
  }

  listenPopState() {
    window.addEventListener('popstate', (event) => {
      this.load(event.state && event.state.path);
    });
  }

  push(path) {
    history.pushState({
      path: path
    }, path + '页面', path);
    this.load(path);
  }

  replace(path) {
    history.replaceState({
      path: path
    }, path + '页面', path);
    this.load(path);
  }

  load(path) {
    let callback = this.routers[path];

    callback && callback();
  }
}

const container = document.getElementById('container');
const routerConfig = {
  '/index': () => {
    container.innerHTML = 'this is index page';
  },
  '/page2': () => {
    container.innerHTML = 'this is page2 page';
  },
  '/page3': () => {
    container.innerHTML = 'this is page3 page';
  }
};
const router = new HistoryRouter(routerConfig);
router.load('/index');

document.addEventListener('click', (event) => {
  if (event.target.nodeName.toLowerCase() === 'a') {
    event.preventDefault();
    router.push(event.target.getAttribute('href'));
  }
});
