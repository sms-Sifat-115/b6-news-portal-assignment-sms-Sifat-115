// Theme Switch Function.
const input = document.querySelector("#color_mode");  
input.addEventListener("change", (e) => {  
 if (e.target.checked) {  
  document.body.setAttribute("id", "dark-preview");
  localStorage.setItem('themeSwitch', 'dark');
 } else {  
  document.body.setAttribute("id", "light-preview"); 
  localStorage.removeItem('themeSwitch');
 }  
});

