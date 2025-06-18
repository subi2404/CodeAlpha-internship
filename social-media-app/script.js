const form = document.querySelector('.create-post');
const postInput = document.getElementById('postInput');
const feedContainer = document.getElementById('feedContainer');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = postInput.value.trim();
  if (!text) return;

  const postHTML = `
    <div class="feed">
      <div class="head">
        <div class="user">
          <div class="profile-pic">
            <img src="https://th.bing.com/th?q=Pixabay+Ai+Girl&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247" />
          </div>
          <div class="info">
            <h3>Scarlett</h3>
            <small>Just now</small>
          </div>
        </div>
        <span class="edit">...</span>
      </div>
      <div class="caption">
        <p><b>@scarlett</b> ${text}</p>
      </div>
      <div class="action-buttons">
        <span>♥</span>
        <span>💬</span>
        <span>🔁</span>
      </div>
      <div class="comments text-muted">
        No comments yet
      </div>
    </div>
  `;

  feedContainer.insertAdjacentHTML('afterbegin', postHTML);
  postInput.value = '';
});
function incrementLike(button) {
  const countSpan = button.nextElementSibling;
  let currentCount = parseInt(countSpan.innerText);
  countSpan.innerText = currentCount + 1;
}
