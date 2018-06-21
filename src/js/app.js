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

  const submitPost = function submitPost(e) {
    e.preventDefault();

    const title = document.querySelector(UI.UISelectors.postTitleInput).value;
    const body = document.querySelector(UI.UISelectors.postBodyInput).value;
    const id = document.querySelector(UI.UISelectors.idInput).value;

    const data = {
      title,
      body,
    };

    console.log(title, body);

    if (title === '' || body === '') {
      UI.showAlert('Please fill in all inputs', 'alert alert--danger');
    } else {
      if (id === '') {
        Http.post('http://localhost:4000/posts', data).then(post =>
          console.log(post),
        );

        return;
      }

      console.log('Update post');
    }
  };

  const loadAllEventListeners = function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    document
      .querySelector(UI.UISelectors.submitBtn)
      .addEventListener('click', submitPost);
  };

  return {
    init() {
      loadAllEventListeners();
    },
  };
})();

App.init();
