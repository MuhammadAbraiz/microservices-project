function setUser(user) {
    localStorage.setItem('token', user.token || '');
    localStorage.setItem('username', user.username);
    localStorage.setItem('user_id', user.id);
}
function clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
}
function getUser() {
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('user_id');
    if (username && id) return { username, id: parseInt(id) };
    return null;
}

function updateUserHeader() {
    const userIcon = document.querySelector('.header-icons a[title="User"]');
    if (!userIcon) return;
    const user = getUser();
    if (user) {
        userIcon.innerHTML = `<i class='fas fa-user'></i> <span style='font-size:0.9em;'>${user.username}</span> <a href='#' id='logout-link' style='color:#f85606;margin-left:8px;font-size:0.9em;'>Logout</a>`;
        const logout = document.getElementById('logout-link');
        if (logout) logout.onclick = function() { clearUser(); location.reload(); };
    } else {
        userIcon.innerHTML = `<i class='fas fa-user'></i>`;
    }
}

function showAuthError(msg) {
    let err = document.getElementById('auth-error');
    if (!err) {
        err = document.createElement('div');
        err.id = 'auth-error';
        err.style.color = '#f85606';
        err.style.margin = '10px 0';
        err.style.textAlign = 'center';
        document.querySelector('.auth-section').prepend(err);
    }
    err.textContent = msg;
}
function clearAuthError() {
    let err = document.getElementById('auth-error');
    if (err) err.textContent = '';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    clearAuthError();
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(async response => {
        btn.disabled = false;
        btn.textContent = 'Login';
        if (!response.ok) {
            const data = await response.json();
            showAuthError(data.detail || 'Login failed.');
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data && data.id && data.username) {
            setUser(data);
            alert('Login successful!');
            updateUserHeader();
            window.location.href = 'index.html';
        }
    })
    .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Login';
        showAuthError('Network error. Please try again.');
    });
});

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    clearAuthError();
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Signing up...';
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    fetch('http://localhost:8001/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(async response => {
        btn.disabled = false;
        btn.textContent = 'Signup';
        if (!response.ok) {
            const data = await response.json();
            showAuthError(data.detail || 'Signup failed.');
            return;
        }
        return response.json();
    })
    .then(data => {
        if (data && data.id && data.username) {
            alert('Signup successful! Please login.');
            document.getElementById('signup-form').reset();
        }
    })
    .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Signup';
        showAuthError('Network error. Please try again.');
    });
});

document.addEventListener('DOMContentLoaded', updateUserHeader); 