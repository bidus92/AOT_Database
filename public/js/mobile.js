const headerNavLinks = document.querySelectorAll("header > div.nav-link");
const menu = document.querySelector("#menu-icon");
const menuImg = document.querySelector("#menu-icon-img");
const dropdownMenu = document.querySelector("#dropdown-menu");
const menuItems = document.querySelectorAll("#dropdown-menu > div");
var windowWidth = screen.availWidth; 
if(windowWidth <= 620)
{
    menuImg.addEventListener("click", ()=>
    {
       menuImg.classList.toggle("menu-pressed");
       dropdownMenu.classList.toggle("dropdown-activated");
       for(let x = 0; x < menuItems.length; x++)
       {
        menuItems[x].classList.toggle("dropdown-activated");
       }
    });
}