
"use strict"
let finalResult;
let apiResponse;

async function getRecipes(meal)
{
    apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    finalResult = await apiResponse.json();
    display();
    close();
}

function display()
{
    let cartona ="";
    for (let index = 0; index < finalResult.meals.length; index++) {
        cartona = cartona+`<div class="col-md-3 mt-4 myCol">
        <div class="position-relative myColInner">
        <img src="${finalResult.meals[index].strMealThumb}" class="w-100 rounded-3 myImage" alt="">
        <div class="layer position-absolute rounded-3 overflow-hidden d-flex align-items-center">
            <p class="ms-3 h3">${finalResult.meals[index].strMeal}</p>
        </div>
    </div>
    </div>`}
    $(".myInnerDiv").html(cartona);
}


getRecipes(" ");


//=================sideBar==========

const icon = document.getElementById("bars");
icon.addEventListener("click",function () {
    if (icon.classList.contains("fa-align-justify"))
    {
        open();
        return;
    }
    close();
    
})

let sideBarWidth = $(".sideBarHidden").outerWidth(true);

function open(){
    icon.classList.remove("fa-align-justify");
    icon.classList.add("fa-x");
    $("#sideBar").animate({left:0})
}

function close() {
    icon.classList.remove("fa-x");
    icon.classList.add("fa-align-justify");
    $("#sideBar").animate({left:-sideBarWidth})
}

//===============search==============

$(".Search").click(function () { 
    $(".container").html(`<div class="row pt-3">
    <div class="col-lg-6">
        <input type="text" class="form-control NameSearch bg-black text-white" placeholder="Search By Name" name="" id="">
    </div>

    <div class="col-lg-6">
        <input type="text" class="form-control bg-black letterSearch text-white" maxlength="1" placeholder="Search By First Letter" name="" id="">
    </div>

    <div class="myInnerDiv row">

    <div>
</div>`

);

close();

let NameSearch = $(".NameSearch");
NameSearch.keyup(function () { 
    getRecipes(NameSearch.val())

});

let letterSearch = $(".letterSearch");
letterSearch.keyup(function () { 
   letterSearch.val()==/(a-z){1}/
   getRecipes(letterSearch.val())

});
});


//===========categories=====================
let catogriesResponse;
let finalResultCatogries;

async function getCatogries()
{
    catogriesResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    finalResultCatogries = await catogriesResponse.json();
    displayCatogries();
}


$(".Categories").click(function () { 
    getCatogries()
    close();
});
function displayCatogries()
{
    let cartona ="";
    for (let index = 0; index < finalResultCatogries.categories.length; index++) {
        cartona = cartona+`<div class="col-md-3 mt-4 myCol">
        <div class="position-relative myColInner">
        <img src="${finalResultCatogries.categories[index].strCategoryThumb}" class="w-100 rounded-3 myImage" alt="">
        <div class="layer position-absolute rounded-3 overflow-hidden text-center">
            <p class="ms-3 h3">${finalResultCatogries.categories[index].strCategory}</p>
            <p>${finalResultCatogries.categories[index].strCategoryDescription}</p>
        </div>
    </div>
    </div>`}
    $(".myInnerDiv").html(cartona);
}

//===================area===================

let areaResponse;
let finalResultArea;

async function getArea()
{
    areaResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    finalResultArea = await areaResponse.json();
    displayArea();
}

$(".Area").click(function () { 
    getArea()
    close();
});



function displayArea()
{
    let cartona ="";
    for (let index = 0; index < finalResultArea.meals.length; index++) {
        cartona = cartona+`<div class="col-lg-3 areaDiv text-white text-center py-3">
        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
        <p class="h3">${finalResultArea.meals[index].strArea}</p>
    </div>`}
    $(".myInnerDiv").html(cartona); 

    $(".areaDiv").click(function () { 
        let areaName = $(this).children("p").html();
        getAreaMeals(areaName)

    });

}



let finalResultAreaMeals;

async function getAreaMeals(AreaMeals)
{
    let areaMealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaMeals}`);
    finalResultAreaMeals = await areaMealsResponse.json();
    displayAreaMeals();
}


function displayAreaMeals()
{
    let cartona ="";
    for (let index = 0; index < finalResultAreaMeals.meals.length; index++) {
        cartona = cartona+`<div class="col-md-3 mt-4 myCol">
        <div class="position-relative myColInner">
        <img src="${finalResultAreaMeals.meals[index].strMealThumb}" class="w-100 rounded-3 myImage" alt="">
        <div class="layer position-absolute rounded-3 overflow-hidden d-flex align-items-center">
            <p class="ms-3 h3">${finalResultAreaMeals.meals[index].strMeal}</p>
        </div>
    </div>
    </div>`}
    $(".myInnerDiv").html(cartona);
}
//=======================ingredients==================  
let ingsResponse;
let finalResultIng;

async function getIng()
{
    ingsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    finalResultIng = await ingsResponse.json();
    displayIng();
}

$(".Ingredients").click(function () { 
    getIng()
    close();
});

function displayIng()
{
    let cartona ="";
    for (let index = 0; index < finalResultIng.meals.length; index++) {
        if(finalResultIng.meals[index].strDescription != null && finalResultIng.meals[index].strDescription != "")
        {
            cartona = cartona+`<div class="col-lg-3 ingDiv text-white text-center py-3">
            <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
            <p class="h3 ingName">${finalResultIng.meals[index].strIngredient}</p>
            <p class="divHeight overflow-hidden">${finalResultIng.meals[index].strDescription}</p>
    
        </div>`
    }
        }

    $(".myInnerDiv").html(cartona); 
    
    $(".ingDiv").click(function () { 
        let ingName = $(this).children(".ingName").html();
        getMealsIng(ingName)

    });
}

let finalResultMealsIng;

async function getMealsIng(ingName)
{
    let mealsIngResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`);
    finalResultMealsIng = await mealsIngResponse.json();
    displayMealsIng();
}

function displayMealsIng()
{
    let cartona ="";
    for (let index = 0; index < finalResultMealsIng.meals.length; index++) {
        cartona = cartona+`<div class="col-md-3 mt-4 myCol">
        <div class="position-relative myColInner">
        <img src="${finalResultMealsIng.meals[index].strMealThumb}" class="w-100 rounded-3 myImage" alt="">
        <div class="layer position-absolute rounded-3 overflow-hidden d-flex align-items-center">
            <p class="ms-3 h3">${finalResultMealsIng.meals[index].strMeal}</p>
        </div>
    </div>
    </div>`}
    $(".myInnerDiv").html(cartona);
}

//====================loading screen==================
$(document).ready(function(){


    

        $(".loading").fadeOut(1000,function(){

            $("body").css("overflow","auto")
            $(this).remove();
        });

})