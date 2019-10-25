class HashRouter {
  /**
   * @param routerConfig
   *    {index: () => {...}, ...}
   */
  constructor(routerConfig) {
    this.routers = routerConfig;
    window.addEventListener('hashchange', this.load.bind(this));
  }

  push(url) {
    location.hash = '#' + url;
  }

  load() {
    let hash = location.hash.slice(1);
    let callback = this.routers[hash];

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
const router = new HashRouter(routerConfig);
router.load();
