import Http from './http';
import UI from './ui';
import '../sass/style.scss';

const App = (function App() {
  const getPosts = function getPosts() {
    Http.get('http://localhost:4000/posts')
      .then(data => UI.displayPosts(data))
      .catch(err =>
        UI.showAlert('OOPS! Something went wrong', 'alert alert--danger', err),
      );
  };

  const addNewPost = function addPost(data) {
    Http.post('http://localhost:4000/posts', data)
      .then(post => {
        UI.clearInputs();
        getPosts();
        UI.showAlert('Post added', 'alert alert--success', post);
      })
      .catch(err =>
        UI.showAlert('OOPS! Something went wrong', 'alert alert--danger', err),
      );
  };

  const addUpdatedPost = function updatePost(id, data) {
    Http.put(`http://localhost:4000/posts/${id}`, data)
      .then(post => {
        UI.clearInputs();
        UI.removeEditStateBtns();
        getPosts();
        UI.showAlert('Post updated', 'alert alert--success', post);
      })
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
        addNewPost(data);
        return;
      }

      addUpdatedPost(id, data);
    }
  };

  const deletePost = function deletePost(id, e) {
    Http.delete(`http://localhost:4000/posts/${id}`)
      .then(() => {
        UI.clearInputs();
        UI.removeEditStateBtns();
        getPosts();
        UI.showAlert('Post Deleted', 'alert alert--success');
      })
      .catch(err =>
        UI.showAlert('OOPS! Something went wrong', 'alert alert--danger', err),
      );

    e.preventDefault();
  };

  const updatePost = function updatePost(e) {
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const { id } = e.target.parentElement.parentElement.dataset;

    document.querySelector(UI.UISelectors.idInput).value = id;

    UI.fillInputsWithValues(title, body);

    UI.displayEditStateBtns();

    e.preventDefault();
  };

  const editPost = function editPost(e) {
    if (e.target.classList.contains('icon--edit')) {
      updatePost(e);
    }

    if (e.target.classList.contains('icon--delete')) {
      const { id } = e.target.parentElement.parentElement.dataset;
      deletePost(id, e);
    }
  };

  const cancelEditState = function cancelEditState(e) {
    UI.clearInputs();
    UI.removeEditStateBtns();

    e.preventDefault();
  };

  const loadAllEventListeners = function loadAllEventListeners() {
    document.addEventListener('DOMContentLoaded', getPosts);
    document
      .querySelector(UI.UISelectors.submitBtn)
      .addEventListener('click', submitPost);
    document
      .querySelector(UI.UISelectors.postsList)
      .addEventListener('click', editPost);
    document
      .querySelector(UI.UISelectors.cancelBtn)
      .addEventListener('click', cancelEditState);
  };

  return {
    init() {
      UI.hideCancelBtn();
      loadAllEventListeners();
    },
  };
})();

App.init();
