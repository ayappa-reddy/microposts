const UI = (function UI() {
  const UISelectors = {
    container: '.container',
    postsList: '.posts-list',
    postsSection: '.posts-section',
    alert: '.alert',
    postTitleInput: '.form__input--post-title',
    postBodyInput: '.form__input--post-body',
    idInput: '.id',
    submitBtn: '.btn--submit',
    form: '.form',
    cancelBtn: '.btn--cancel',
  };

  return {
    UISelectors,

    hideCancelBtn() {
      document.querySelector(UISelectors.cancelBtn).style.display = 'none';
    },

    showCancelBtn() {
      document.querySelector(UISelectors.cancelBtn).style.display =
        'inline-block';
    },

    displayPosts(posts) {
      let html = '';

      posts.forEach(post => {
        html += `
          <li class="posts-list__item" data-id=${post.id}>
            <h5 class="heading heading--5 posts-list__title">${post.title}</h5>
            <p class="paragraph paragraph--secondary posts-list__body">${
              post.body
            }</p>
            <a href="#" class="posts-list__link posts-list__link--1">
              <span class="icon icon--edit">&#9997; Edit</span>
            </a>
            <a href="#" class="posts-list__link posts-list__link--2">
              <span class="icon icon--delete">&times; Delete</span>
            </a>
          </li>
        `;
      });

      document.querySelector(UISelectors.postsList).innerHTML = html;
    },

    showAlert(message, className) {
      if (!document.querySelector(UISelectors.alert)) {
        const alertDiv = document.createElement('div');

        alertDiv.className = className;
        alertDiv.appendChild(document.createTextNode(message));

        document
          .querySelector(UISelectors.container)
          .insertBefore(
            alertDiv,
            document.querySelector(UISelectors.postsSection),
          );

        setTimeout(() => {
          this.removeAlert();
        }, 2000);
      }
    },

    removeAlert() {
      document.querySelector(UISelectors.alert).remove();
    },

    clearInputs() {
      document.querySelector(UISelectors.postTitleInput).value = '';
      document.querySelector(UISelectors.postBodyInput).value = '';
      document.querySelector(UISelectors.idInput).value = '';
    },

    fillInputsWithValues(title, body) {
      document.querySelector(UISelectors.postTitleInput).value = title;
      document.querySelector(UISelectors.postBodyInput).value = body;
    },

    displayEditStateBtns() {
      document.querySelector(UISelectors.submitBtn).textContent = 'Update Post';
      document
        .querySelector(UISelectors.submitBtn)
        .classList.add('btn--update');

      this.showCancelBtn();
    },

    removeEditStateBtns() {
      document.querySelector(UISelectors.submitBtn).textContent = 'Post It';
      document
        .querySelector(UISelectors.submitBtn)
        .classList.remove('btn--update');

      this.hideCancelBtn();
    },
  };
})();

export default UI;
