import Http from './http';

const App = (function App() {
  Http.get('http://localhost:4000/posts')
    .then(data => console.log(data))
    .catch(err => console.log(err));

  return {
    init: function init() {},
  };
})();

App.init();
