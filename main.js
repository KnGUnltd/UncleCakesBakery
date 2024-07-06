// Add your JavaScript code here to handle user interactions, API calls, and dynamic content generation

// Example: Fetch and display featured recipes
function displayFeaturedRecipes() {
    const recipeGrid = document.querySelector('.recipe-grid');
  
    // Fetch recipe data from a backend API or database
    fetch('/api/featured-recipes')
      .then(response => response.json())
      .then(data => {
        data.forEach(recipe => {
          const recipeCard = createRecipeCard(recipe);
          recipeGrid.appendChild(recipeCard);
        });
      })
      .catch(error => {
        console.error('Error fetching featured recipes:', error);
      });
  }
  
  function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
  
    // Create and append recipe card elements (image, title, description, etc.)
  
    card.addEventListener('click', () => {
      displayRecipeDetails(recipe);
    });
  
    return card;
  }
  
  function displayRecipeDetails(recipe) {
    const recipeDetailsPage = document.querySelector('.recipe-details-page');
    const recipeDetailsContainer = recipeDetailsPage.querySelector('.recipe-details');
  
    // Fetch additional recipe details from the backend
    fetch(`/api/recipes/${recipe.id}`)
      .then(response => response.json())
      .then(data => {
        // Populate the recipe details container with the fetched data
        recipeDetailsContainer.innerHTML = `
          <h2>${data.title}</h2>
          <img src="${data.imageUrl}" alt="${data.title}">
          <h3>Ingredients</h3>
          <ul>
            ${data.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
          <h3>Instructions</h3>
          <p>${data.instructions}</p>
          <h3>Nutritional Information</h3>
          <p>Calories: ${data.calories}</p>
          <p>Servings: ${data.servings}</p>
          <div class="rating">
            <span>Rating: ${data.rating}</span>
            <div class="stars">
              ${Array.from({ length: data.rating }, (_, i) => `<i class="star"></i>`).join('')}
            </div>
          </div>
          <div class="comments">
            <h3>Comments</h3>
            ${data.comments.map(comment => `<div class="comment"><strong>${comment.author}:</strong> ${comment.text}</div>`).join('')}
          </div>
        `;
  
        recipeDetailsPage.style.display = 'block';
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
      });
  }
  
  // Call the function to display featured recipes
  displayFeaturedRecipes();  