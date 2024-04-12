// Wait for the DOM content to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    // Event listener for form submission
    form.addEventListener('submit', (event) => {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Get the value from the search input
      const searchTerm = document.getElementById('search').value;
      // Call the searchUsers function with the search term
      searchUsers(searchTerm)
        // Once the promise is resolved, display the users
        .then(users => displayUsers(users))
        // If there's an error, log it to the console
        .catch(error => console.error('Error searching users:', error));
    });
  
    // Function to search GitHub users based on a search term
    function searchUsers(searchTerm) {
      // Make a fetch request to the GitHub API
      return fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        // Parse the response as JSON
        .then(response => response.json())
        // Extract the items array from the response data
        .then(data => data.items);
    }
  
    // Function to display the list of users
    function displayUsers(users) {
      // Clear the previous user list
      userList.innerHTML = '';
      // Loop through each user in the array
      users.forEach(user => {
        // Create a list item for each user
        const listItem = document.createElement('li');
        // Set the inner HTML of the list item to display user information
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}'/>
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        // Add a click event listener to the list item
        listItem.addEventListener('click', () => {
          // When clicked, display the repositories for the selected user
          displayUserRepos(user.login);
        });
        // Append the list item to the user list
        userList.appendChild(listItem);
      });
    }
  
    // Function to display the repositories for a specific user
    function displayUserRepos(username) {
      // Make a fetch request to the GitHub API to get the user's repositories
      fetch(`https://api.github.com/users/${username}/repos`)
        // Parse the response as JSON
        .then(response => response.json())
        // Once the repositories are retrieved, display them
        .then(repos => displayRepos(repos))
        // If there's an error, log it to the console
        .catch(error => console.error('Error fetching repositories:', error));
    }
  
    // Function to display the list of repositories for a user
    function displayRepos(repos) {
      // Clear the previous repositories list
      reposList.innerHTML = '';
      // Loop through each repository in the array
      repos.forEach(repo => {
        // Create a list item for each repository
        const listItem = document.createElement('li');
        // Set the text content of the list item to display the repository's full name
        listItem.textContent = repo.full_name;
        // Append the list item to the repositories list
        reposList.appendChild(listItem);
      });
    }
  });
  