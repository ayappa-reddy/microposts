const UI = (function UI() {
  const UISelectors = {
    container: '.container',
    postsList: '.posts-list',
    postsSection: 'posts-section',
    alert: '.alert',
  };

  return {
    UISelectors,

    displayPosts(posts) {
      let html = '';

      posts.forEach(post => {
        html += `
          <li class="posts-list__item">
            <h5 class="heading heading--5">${post.title}</h5>
            <p class="paragraph paragraph--secondary">${post.body}</p>
            <a href="#" class="posts-list__link">
              <span class="icon icon--edit">&#9997;</span>
            </a>
            <a href="#" class="posts-list__link">
              <span class="icon icon--edit">&times;</span>
            </a>
          </li>
        `;
      });

      document.querySelector(UISelectors.postsList).innerHTML = html;
    },

    showAlert(message, className) {
      if (document.querySelector(UISelectors.alert)) {
        this.removeAlert();
      }

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
      }, 3000);
    },

    removeAlert() {
      document.querySelector(UISelectors.alert).remove();
    },
  };
})();

export default UI;
