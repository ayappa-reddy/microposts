import Http from './http';
import UI from './ui';

const App = (function App() {
  const getPosts = function getPosts() {
    Http.get('http://localhost:4000/posts')
      .then(data => UI.displayPosts(data))
      .catch(err =>
        UI.showAlert('OOPS! Something went wrong', 'alert alert--danger', err),
      );
  };

  const loadAllEventListeners = function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
  };

  return {
    init() {
      loadAllEventListeners();
    },
  };
})();

App.init();
