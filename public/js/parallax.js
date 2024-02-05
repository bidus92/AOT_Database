const eren = document.getElementById("eren"); 
const reiner = document.getElementById("reiner"); 



window.addEventListener('scroll', ()=>
{
    let value = window.scrollY; 

    eren.style.marginRight = value * 350.002 + 'px'; 
    reiner.style.marginLeft = value * 350.002 + 'px'; 

});

const width = screen.availWidth; 

if(width <= 430)
{
    window.addEventListener('touchmove', ()=>
    {
        let value = window.scrollY; 
    
        eren.style.marginRight = value * 300.002 + 'px'; 
        reiner.style.marginLeft = value * 300.002 + 'px'; 
    
    });
}
