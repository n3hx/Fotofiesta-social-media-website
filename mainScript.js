"use strict"; // Enforces stricter parsing and error handling

let savedPosts = []; // Array to store saved posts

document.addEventListener("DOMContentLoaded", () => {
  renderPage(); // Call the function to render the main page when the DOM is loaded
});

function renderPage() {
  const body = document.body;

  // Main
  const main = document.createElement("main");
  body.appendChild(main);

  // Left Sidebar
  const leftSidebar = document.createElement("section");
  leftSidebar.classList.add("widget-column", "left-widget");
  leftSidebar.id = "sidebar";
  main.appendChild(leftSidebar);

  renderSidebar(); // Render the left sidebar

  // Content Area
  const content = document.createElement("section");
  content.id = "content";
  main.appendChild(content);

  // Right Sidebar
  const rightSidebar = document.createElement("section");
  rightSidebar.classList.add("widget-column", "right-widget");
  main.appendChild(rightSidebar);

  renderLoginForm(rightSidebar); // Initial login form

  // Footer
  const footer = document.createElement("footer");
  footer.id = "footer";
  footer.innerHTML = `<p>&copy; 2024 FotoFiesta - All rights reserved</p>`;
  body.appendChild(footer);

  // Event listener to the "Post" button
  const postButton = document.getElementById("postButton");
  postButton.addEventListener("click", () => renderPostForm(content));

  // Event listener to the "Explore" button
  const exploreButton = document.getElementById("exploreButton");
  exploreButton.addEventListener("click", () => renderExploreFeed(content));

  // Event listener to the "Home" button
  const homeButton = document.getElementById("homeButton");
  homeButton.addEventListener("click", () => renderUserProfile(content));

  // Event listener to the "Saved" button in the sidebar
  const savedButton = document.getElementById("savedButton");
  savedButton.addEventListener("click", () => renderSavedPosts(content));
}

//Navigation menu
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <img src="Assets/logo.png" alt="logo" width="100" height="100">
    <nav>
      <input type="text" id="search" placeholder=" 🔍Search..."> 
      <a button id="postButton">Post</a>
      <a button id="exploreButton">Explore</a>
      <h3>ACCOUNT</h3>
      <a button id="homeButton">Home</a>
      <a button onclick="renderSavedPosts()">Saved</a>
      <a button id="logoutBtn">Log Out</a>
    </nav>
  `;

  // Attach click event to logout button
  document.getElementById('logoutBtn').addEventListener('click', () => {
    // Clear the content of the right sidebar
    document.getElementById('content').innerHTML = '';
    // Show the right sidebar again
    document.querySelector('.right-widget').style.display = 'block';
    // Render the login form
    renderLoginForm(document.querySelector('.right-widget'));
  });
}

// Log In Form
function renderLoginForm(container) {
  container.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <label for="email">Enter Email:</label>
      <input type="email" id="email" name="email" required onkeyup="validateEmail(this)">
      <span id="signupEmailError" class="error-message"></span>

      <label for="password">Enter Password:</label>
      <input type="password" id="password" name="password" required onkeyup="validatePassword(this)">
      <span id="signupPasswordError" class="error-message"></span>

      <button type="submit" onclick="login(event)">Log In</button>
    </form>
    <p>Don't have an account? <a href="#" id="registerLink">Register</a></p>
  `;

  // Attach click event to register link
  document.getElementById('registerLink').addEventListener('click', renderSignupForm);
  document.getElementById('loginForm').addEventListener('submit', login);
}

function renderSignupForm() {
  // Get the container for rendering the signup form
  const container = document.querySelector('.right-widget');
  
  // Render the signup form
  container.innerHTML = `
    <h2>Sign Up</h2>
    <form id="signupForm">
      <label for="name">Enter Name:</label>
      <input type="text" id="name" name="name" required onkeyup="validateName(this)">
      <span id="nameError" class="error-message"></span>

      <label for="email">Enter Email:</label>
      <input type="email" id="email" name="email" required onkeyup="validateEmail(this)">
      <span id="signupEmailError" class="error-message"></span>

      <label for="password">Enter Password:</label>
      <input type="password" id="password" name="password" required onkeyup="validatePassword(this)">
      <span id="signupPasswordError" class="error-message"></span>

      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required onkeyup="validateConfirmPassword(this)">
      <span id="confirmPasswordError" class="error-message"></span>

      <label for="dob">Date of Birth:</label>
      <input type="date" id="dob" name="dob" required onkeyup="validateDOB(this)">
      <span id="dobError" class="error-message"></span>

      <label for="phoneNumber">Phone Number:</label>
      <input type="tel" id="phoneNumber" name="phoneNumber" required onkeyup="validatePhoneNumber(this)">
      <span id="phoneNumberError" class="error-message"></span>

      <button type="submit" onclick="signup(event)">Sign Up</button>
    </form>
    <p>Already have an account? <a href="#" id="loginLink">Log in</a></p>
  `;

  // Attach click event to login link
  document.getElementById('loginLink').addEventListener('click', () => renderLoginForm(container));
  document.getElementById('signupForm').addEventListener('submit', signup);
}

async function signup(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/M00940320/userRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    alert('Registration successful!');
    renderLoginForm(document.querySelector('.right-widget'));
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed. Please try again.');
  }
}

async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/M00940320/userLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    const rightSidebar = document.querySelector('.right-widget');
      rightSidebar.style.display = 'none'; // Hide the right sidebar
      alert('Login successful!');

  } catch (error) {
    console.error('Error:', error);
    alert('Login failed. User does not exist.');
  }
}

// Function to validate the name input
function validateName(input) {
  const isValid = input.value.trim().length > 0;
  updateValidationStyle(input, isValid, 'nameError', 'Please enter your name');
}

// Function to validate the email input
function validateEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(input.value);
  updateValidationStyle(input, isValid, 'signupEmailError', 'Please provide a valid email address');
}

// Function to validate the password input
function validatePassword(input) {
  // Password should contain at least one special character, one capital letter, and one number
  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*(?=.*[A-Z]).*(?=.*[0-9]).*$/;
  const isValid = passwordRegex.test(input.value);
  updateValidationStyle(input, isValid, 'signupPasswordError', 'Password must contain at least 8 characters, including a capital letter, a number, and a special character');
}

// Function to validate the confirm password input
function validateConfirmPassword(input) {
  const password = document.getElementById('password').value;
  const isValid = input.value === password;
  updateValidationStyle(input, isValid, 'confirmPasswordError', 'Passwords don\'t match');
}

// Function to validate the date of birth input
function validateDOB(input) {
  const currentDate = new Date();
  const dob = new Date(input.value);
  const age = currentDate.getFullYear() - dob.getFullYear();
  const isValid = age >= 16;
  updateValidationStyle(input, isValid, 'dobError', 'You must be at least 16 years old');
}

// Function to validate the phone number input
function validatePhoneNumber(input) {
  const phoneNumberRegex = /^[0-9]{8,15}$/;
  const isValid = phoneNumberRegex.test(input.value);
  updateValidationStyle(input, isValid, 'phoneNumberError', 'Phone Number must be 8 to 15 digits');
}

// Function to update validation style and display error messages
function updateValidationStyle(input, isValid, errorId, errorMessage) {
  input.style.border = isValid ? '2px solid #0ecb0e' : '2px solid red';
  const errorSpan = document.getElementById(errorId);
  errorSpan.textContent = isValid ? '' : errorMessage;
  errorSpan.style.color = 'red';
}
// Function to render the post form

function renderPostForm(container) {
  // Create and render the post form
  const form = document.createElement('form');
  form.id = 'post-form';
  form.innerHTML = `
    <label for="caption">Add a caption:</label><br>
    <input type="text" id="caption" name="caption"><br>
    <input type="file" id="photo" name="photo"><br>
    <input type="submit" value="Post">
    <input type="button" value="Cancel" onclick="cancelForm()">
  `;

  // Clear existing content and append the form to the container
  container.innerHTML = '';
  container.appendChild(form);

  // Add event listener to the form for submission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const caption = document.getElementById('caption').value;

    // Send post data to server using AJAX
    fetch('/M00940320/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ caption }),
    })
    .then(response => response.json())
    .then(
      alert('Caption posted successfully!')
    )
    .catch(error => console.error('Error:', error));
  });
}

// Function to clear the caption input and keep the form open
function cancelForm() {
  document.getElementById('caption').value = ''; // Clear the caption input
  
}

function renderExploreFeed(container) {
  // Create feed items to showcase in the explore feed
  const feedItem1 = createFeedItem("https://i.pinimg.com/736x/50/19/92/501992e81deba7b7456fe3b76ca3e49b.jpg", "Kate Williams", "Beautiful sunflower field!", "https://c4.wallpaperflare.com/wallpaper/122/879/734/sunflowers-wallpaper-preview.jpg");
  const feedItem2 = createFeedItem("https://i.pinimg.com/474x/97/aa/84/97aa847d061a14894178805f1d551500.jpg","Samsara Jones", "Stunning mountain view!", "https://hips.hearstapps.com/hmg-prod/images/mountain-views-heidelberg-south-africa-1518806717.jpg");
  const feedItem3 = createFeedItem("https://i.pinimg.com/736x/98/1d/6b/981d6b2e0ccb5e968a0618c8d47671da.jpg","Kyan Smith", "Lovely beach sunset!", "https://gasparillaboattours.com/wp-content/uploads/2023/09/Sunset-Cruises-3.jpg");

  // Display the feed items in the container
  container.innerHTML = '';
  container.appendChild(feedItem1);
  container.appendChild(feedItem2);
  container.appendChild(feedItem3);
}

function createFeedItem(profilePictureUrl, author, caption, imageUrl, isSaved) {
  // Create a feed item with author, caption, image, and interactive buttons
  const feedItem = document.createElement('div');
  feedItem.classList.add('feed-item');
  feedItem.innerHTML = `
    <div class="author-info">
      <img class="profile-picture" src="${profilePictureUrl}" alt="Profile Picture">
      <h2>${author}</h2>
    </div>
    <h4>${caption}</h4>
    <img src="${imageUrl}" alt="Example" width="100%">
    <br>
    <button class="likeBtn" onclick="toggleLike(this)">Like</button>
    <button class="commentBtn" onclick="openCommentForm(this.parentNode)">Comment</button>
    ${isSaved
      ? `<button class="saveBtn saved" onclick="unsavePost(this)">Unsave</button>`
      : `<button class="saveBtn" onclick="savePost(this)">Save</button>`
    }
  `;


  return feedItem;
}

// Function to toggle the 'liked' class on the like button
function toggleLike(likeBtn) {
  likeBtn.classList.toggle('liked');
}

// Function to open the comment form on a feed item
function openCommentForm(feedItem) {
  // Check if the comment form is already open
  const existingCommentForm = document.getElementById('comment-form');
  if (existingCommentForm) {
    return; // Do nothing if the comment form is already open
  }

  const container = feedItem;

  // Create and append the comment form to the container
  const commentForm = document.createElement('form');
  commentForm.id = 'comment-form';
  commentForm.innerHTML = `
    <label for="comment">Add a comment:</label><br>
    <textarea id="commentText" name="comment"></textarea><br>
    <input type="submit" value="Post Comment">
    <input type="button" value="Cancel" onclick="cancelCommentForm()" style="background-color: #f44336; color: #fff; border: none; padding: 5px 10px; cursor: pointer;">
  `;

  container.appendChild(commentForm);

  // Add event listener to the comment form for submission
  commentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const commentText = document.getElementById('commentText').value;

    // Send comment data to server using AJAX
    fetch('/M00940320/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: commentText }),
    })
    .then(response => response.json())
    .then(data => {
      // Add the new comment to the UI
      const commentList = document.createElement('ul');
      commentList.innerHTML = `<p>${data.comment}</p>`; 
      container.appendChild(commentList);
    })
    .catch(error => console.error('Error:', error));
  });
}

// Function to cancel the comment form
function cancelCommentForm() {
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.remove(); // Remove the comment form if it exists
  }
}


function renderUserProfile(container) {
  // Create a profile container
  const profileContainer = document.createElement("div");
  profileContainer.id = "profile-container";

  // Clear the existing content in the container
  container.innerHTML = '';
  container.appendChild(profileContainer);

  // Create a title for the profile
  const profileTitle = document.createElement("h2");
  profileTitle.textContent = "My Account - Arusha Ramessur";
  profileContainer.appendChild(profileTitle);

  // Create user info section
  const userInfo = document.createElement("div");
  userInfo.id = "user-info";
  profileContainer.appendChild(userInfo);

  // Create and set up the profile picture
  const profilePicture = document.createElement("img");
  profilePicture.id = "profile-picture";
  profilePicture.src = "https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg";
  profilePicture.alt = "Profile Picture";
  userInfo.appendChild(profilePicture);

  // Create and set up followers count
  const followersCount = document.createElement("span");
  followersCount.id = "followers";
  followersCount.textContent = "100";
  const followersParagraph = document.createElement("p");
  followersParagraph.textContent = "Followers: ";
  followersParagraph.appendChild(followersCount);
  userInfo.appendChild(followersParagraph);

  // Create and set up following count
  const followingCount = document.createElement("span");
  followingCount.id = "following";
  followingCount.textContent = "50";
  const followingParagraph = document.createElement("p");
  followingParagraph.textContent = "Following: ";
  followingParagraph.appendChild(followingCount);
  userInfo.appendChild(followingParagraph);

  // Create and set up about me section
  const aboutMe = document.createElement("p");
  aboutMe.id = "about-me";
  aboutMe.textContent = "A lady chasing dreams and capturing moments!";
  profileContainer.appendChild(aboutMe);

  // Create and set up post container
  const postContainer = document.createElement("div");
  postContainer.id = "post-container";
  profileContainer.appendChild(postContainer);

  // User data for testing purposes
  const userData = {
    profilePictureSrc: "https://cdn.vectorstock.com/i/preview-1x/15/40/blank-profile-picture-image-holder-with-a-crown-vector-42411540.jpg",
    followers: 100,
    following: 50,
    posts: [
      {
        imageUrl: "https://www.recordnet.com/gcdn/presto/2021/03/22/NRCD/9d9dd9e4-e84a-402e-ba8f-daa659e6e6c5-PhotoWord_003.JPG?width=660&height=425&fit=crop&format=pjpg&auto=webp",
        comments: [
          { username: "Jonie Smith", comment: "Cute!" },
          { username: "Peter Parker", comment: "Love this!" }
        ]
      },
      {
        imageUrl: "https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms",
        comments: [
          { username: "Millie Jenner", comment: "Wow!" },
          { username: "Chris Evans", comment: "Amazing!" }
        ]
      }
    ]
  };

  // Render user profile
  profilePicture.src = userData.profilePictureSrc;
  followersCount.textContent = userData.followers;
  followingCount.textContent = userData.following;

  // Render user posts
  userData.posts.forEach(post => {
    const postElement = createPostElement(post, postContainer);
    postContainer.appendChild(postElement);
  });
}


// Function to create a post element
function createPostElement(post, container) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  // Create and set up post image
  const postImage = document.createElement("img");
  postImage.src = post.imageUrl;
  postElement.appendChild(postImage);

  // Create and set up comments section
  const commentsElement = document.createElement("div");
  commentsElement.classList.add("comments");

  // Iterate through comments and create elements
  post.comments.forEach(comment => {
    const commentText = document.createElement("p");
    commentText.innerHTML = `<strong>${comment.username}:</strong> ${comment.comment}`;
    commentsElement.appendChild(commentText);
  });

  // Append comments section to post element
  postElement.appendChild(commentsElement);

  // Append post element to the specified container
  container.appendChild(postElement);

  return postElement;
}

// Function to save a post
function savePost(saveBtn) {
  const feedItem = saveBtn.parentNode;
  const author = feedItem.querySelector('h2').textContent;
  const caption = feedItem.querySelector('h4').textContent;
  const imageUrl = feedItem.querySelector('img').src;
  const profilePictureUrl = feedItem.querySelector('img:not(.profile-picture)').src;

  // Create a saved post object
  const savedPost = {
    author: author,
    caption: caption,
    imageUrl: imageUrl,
    profilePictureUrl: profilePictureUrl,
  };

  // Check if the post is not already saved
  if (!savedPosts.some(post => post.imageUrl === imageUrl)) {
    // Add the post to the savedPosts array
    savedPosts.push(savedPost);
    alert('Post saved!');
    saveBtn.classList.add('saved'); // Add 'saved' class to the button
  } else {
    alert('Post already saved!');
  }
}

// Function to unsave a post
function unsavePost(unsaveBtn) {
  const feedItem = unsaveBtn.parentNode;
  const imageUrl = feedItem.querySelector('img').src;

  // Remove the saved post from the array
  const indexToRemove = savedPosts.findIndex(post => post.imageUrl === imageUrl);
  if (indexToRemove !== -1) {
    savedPosts.splice(indexToRemove, 1);

    // Remove the corresponding HTML element from the rendered saved posts
    const content = document.getElementById('content');
    const savedPostElements = content.querySelectorAll('.feed-item');

    for (const savedPostElement of savedPostElements) {
      if (savedPostElement.querySelector('img').src === imageUrl) {
        savedPostElement.remove();
        break; // Exit the loop after removing the first matching element
      }
    }

    alert('Post removed from saved!');
  } else {
    alert('Post not found in saved posts!');
  }
}


// Function to render saved posts
function renderSavedPosts() {
  // Get the content element
  const content = document.getElementById('content');
  content.innerHTML = '';

  // Check if there are saved posts
  if (savedPosts.length > 0) {
    // Loop through saved posts and create elements
    savedPosts.forEach(post => {
      const savedPostElement = createFeedItem(post.imageUrl, post.author, post.caption, post.profilePictureUrl, true);
      content.appendChild(savedPostElement);
    });
  } else {
    content.innerHTML = '<p>No saved posts yet.</p>';
  }
}