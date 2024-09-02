document.addEventListener('DOMContentLoaded', (event) => {
    loadPosts();
});

function addPost() {
    const content = document.getElementById('post-content').value;
    const password = document.getElementById('post-password').value;

    if (content && password) {
        const postList = document.getElementById('post-list');
        const newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.innerText = content;
        postList.appendChild(newPost);

        // Clear the input fields
        document.getElementById('post-content').value = '';
        document.getElementById('post-password').value = '';
    } else {
        alert('请填写日志内容和密码');
    }
}

function loadPosts() {
    fetch('/posts')
    .then(response => response.json())
    .then(posts => {
        const postList = document.getElementById('post-list');
        posts.forEach(content => {
            const post = document.createElement('div');
            post.className = 'post';
            post.textContent = content;
            postList.appendChild(post);
        });
    })
    .catch(error => console.error('Error:', error));
}