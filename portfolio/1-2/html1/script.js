function toggleTheme() {
  const body = document.querySelector('body');
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  }
}
// Retrieve the saved theme from local storage when the page loads
window.onload = function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
}

// Toggle and save the theme to local storage
function toggleTheme() {
  const body = document.querySelector('body');
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme'); // Save the selected theme to local storage
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme'); // Save the selected theme to local storage
  }
}