document.addEventListener("DOMContentLoaded", () => {
    const recipeInput = document.querySelector(".recipe-input");
    const searchBtn = document.querySelector(".search-btn");
    const recipeContainer = document.querySelector(".recipe-container");

    const fetchRecipes = async (query) => {
        recipeContainer.innerHTML = `<h2>Fetching Recipes...</h2>`;
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();

            if (data.meals) {
                renderRecipes(data.meals);
                console.log(data)
            } else {
                recipeContainer.innerHTML = `<h2>No recipes found. Try another search!</h2>`;
            }
        } catch (error) {
            recipeContainer.innerHTML = `<h2>Error fetching recipes. Please try again later.</h2>`;
            console.error(error);
        }
    };

    const renderRecipes = (meals) => {
        recipeContainer.innerHTML = "";
        meals.forEach((meal) => {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea}</span> Dish</p>
                <p>${meal.strCategory}</p>
                <button class="btn">View Recipe</button>
            `;
            const btn = recipeDiv.querySelector(".btn");
            btn.addEventListener("click", () => openRecipePop(meal));
            recipeContainer.appendChild(recipeDiv);
        });
    };

    const openRecipePop = (meal) => {
        localStorage.setItem("selectedMeal", JSON.stringify(meal));
        history.pushState({ meal }, null, "recipepage");
        window.location.href = "recipe.html";
    };

    searchBtn.addEventListener("click", () => {
        const query = recipeInput.value.trim();
        if (query) {
            fetchRecipes(query);
        }
    });
});
