const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const single_mealEl = document.getElementById("single-meal");
const result_headingEl = document.getElementById("result-heading");

// Search and Fetch meals
function searchMeal(event) {
  event.preventDefault();
  // Clear single meal
  single_mealEl.innerHTML = "";

  // Get searched term
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        result_headingEl.innerHTML = `<h2>Search result for '${term}'</h2>`;
        if (data.meals == null) {
          result_headingEl.innerHTML = `<p>There is no search results. Try again!<p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
                    <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
                    <div class="meal-info" data-mealId=${meal.idMeal}>
                    <h3>${meal.strMeal}</h3>
                    </div>
                    </div>`
            )
            .join("");
        }

        // Clear search text
        search.value = "";
      });
  } else {
    alert("You should write a word to search.");
  }
}

// Fetch a meal by ID
function getMealById(mealId){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
  .then(res=> res.json())
  .then(data => {
    const meal = data.meals[0];

    addMealToDom(meal);
  })
}

// Fetch random meal
function randomMeal(){
  // Clear meals and heading
  mealsEl.innerHTML= "";
  result_headingEl.innerHTML="";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res =>res.json())
  .then(data => {
    const meal = data.meals[0];

    addMealToDom(meal);
  })
}

// Add meal to Dom
function addMealToDom(meal){
  const ingredients = [];

  for (let i = 1; i <=20; i++) {
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }else{
      break;
    }
  }

  single_mealEl.innerHTML= `<div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>`: ""}
  </div>
  <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
    </ul>
  </div>
  </div>`

}

// Event Listners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);
mealsEl.addEventListener("click", (event) => {
  const mealInfo = event.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});

