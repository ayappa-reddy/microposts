import Http from './http';
import UI from './ui';
import '../sass/style.scss';

const App = (function App() {
  const getPosts = function getPosts() {
    console.log('called');
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

    if (title === '' || body === '') {
      UI.showAlert('Please fill in all inputs', 'alert alert--danger');
    } else {
      if (id === '') {
        Http.post('http://localhost:4000/posts', data)
          .then(post => {
            UI.clearInputs();
            getPosts();
            UI.showAlert('Post added', 'alert alert--success', post);
          })
          .catch(err =>
            UI.showAlert(
              'OOPS! Something went wrong',
              'alert alert--danger',
              err,
            ),
          );

        return;
      }

      console.log('Update post');
    }
  };

  const editPost = function editPost(e) {
    if (e.target.classList.contains('icon--edit')) {
      const title =
        e.target.parentElement.previousElementSibling.previousElementSibling
          .textContent;
      const body = e.target.parentElement.previousElementSibling.textContent;

      const { id } = e.target.parentElement.parentElement.dataset;

      document.querySelector(UI.UISelectors.idInput).value = id;

      UI.fillInputsWithValues(title, body);

      UI.displayEditStateBtns();

      e.preventDefault();
    }
  };

  const loadAllEventListeners = function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    document
      .querySelector(UI.UISelectors.submitBtn)
      .addEventListener('click', submitPost);
    document
      .querySelector(UI.UISelectors.postsList)
      .addEventListener('click', editPost);
  };

  return {
    init() {
      loadAllEventListeners();
    },
  };
})();

App.init();
