const eren = document.getElementById("eren"); 
const reiner = document.getElementById("reiner"); 



window.addEventListener('scroll', ()=>
{
    let value = window.scrollY; 

    eren.style.marginRight = value * 1.002 + 'px'; 
    reiner.style.marginLeft = value * 1.002 + 'px'; 

});