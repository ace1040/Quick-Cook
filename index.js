const searchbtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meals-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const opt = ['chicken', 'tomato', 'lettuce'];
const randomEle = Math.floor(Math.random() * opt.length);
const randomItem = opt[randomEle];
defaultShow(randomItem);
// event listener 

document.addEventListener('keypress', (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
        getMealList();
    }
})
searchbtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// functions 

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let edi = document.querySelector(".meal-result .title");
    edi.innerHTML = "Your search results:"
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json()).then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="meal-item" data-id=${meal.idMeal}>
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" >
                        </div>
                        <h3 class="meal-name">${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
`;
            });
            mealList.classList.remove('not-found');
        } else {
            html = "Sorry we didn't find any meals! 😭"
            mealList.classList.add("not-found")
        }
        mealList.innerHTML = html;
    });
}

function getMealRecipe(e) {
    e.preventDefault();

    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement;
        // console.log(mealItem.dataset.id);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => response.json()).then(data => {
            mealRecipeModal(data);
        })
    }

}

function mealRecipeModal(meal) {
    meal = meal.meals[0];
    console.log(meal);
    let html = `
    <h2 class="recipe-title">
                        ${meal.strMeal}
                    </h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="recipe-meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe")
    console.log(mealDetailsContent.parentElement);

}

function defaultShow(search) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`).then(response => response.json()).then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="meal-item" data-id=${meal.idMeal}>
                            <div class="meal-img">
                                <img src="${meal.strMealThumb}" alt="food" >
                        </div>
                        <h3 class="meal-name">${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
`;
            });
            mealList.classList.remove('not-found');
        } else {
            html = "Sorry we didn't find any meals! 😭"
            mealList.classList.add("not-found")
        }
        mealList.innerHTML = html;
    });

}