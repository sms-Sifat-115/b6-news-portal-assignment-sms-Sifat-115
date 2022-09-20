// Theme Switch Function.
const input = document.querySelector("#color_mode"); 

input.addEventListener("change", (e) => {  
 if (e.target.checked) {  
  document.body.setAttribute("id", "dark-preview");

 } else {  
  document.body.setAttribute("id", "light-preview");
  
 }  
});


// API
const newsDiv = document.getElementById("news-container");
const spinner = document.getElementById("spinner");

loadNews = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data.news_category);
    }
    catch {
        console.log('error occured');
    }

};

const clickedBtn = (btnId) => {
    //spinner start
    toggleSpinner(true);
    try {
        let formatedBtnId = "0" + btnId;
        clickNews(formatedBtnId);
        newsDiv.appendChild((newsDiv.innerHTML = "<div></div>"));
    } catch {
        console.log("error occured");
    }
};

const clickNews = async (category_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url);
        const data = await res.json();

        const allNewsOnThatCategory = data.status
            ? data.data[0]._id
            : "NEWS not Available 😥 !";
        const news = data.data;

        everyNewsCard(news);
        return allNewsOnThatCategory;
    }
    catch {
        console.log('error occured');
    }
};

const everyNewsCard = (news) => {
    let singleNewsArray = [];
    const newsNumber = document.getElementById('news-number');
    if (news.length) {
        console.log(typeof (news.length));
        newsNumber.innerText = '';
        if (news.length > 0) {
            sectionHiding(true);
            newsNumber.innerText = news.length;
        }
        
        news.forEach((perNews) => {
            singleNewsArray.push(perNews._id);
            let forEveryCards = document.createElement("div");
        
            forEveryCards.innerHTML = `
                    <div id="news-card-container" class="card mb-5 ">
                        <div class="row d-flex flex-column flex-lg-row align-items-center">
                            <div class="col-4">
                                <img src="${perNews.image_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title mb-2">${perNews.title}</h5>
                                    <p class="card-text  mb-5">${perNews.details.slice(0, 200) + '...'}</p>
                                    <div class="d-flex justify-content-between flex-column flex-lg-row align-items-center">
                                        <div>
                                            <img src="${perNews.author.img}" class="author-picture img-fluid" style="height:50px; width=50px" alt="...">
                                            <p>${perNews.author.name ? perNews.author.name : 'No Author Found'}</p>
                                        </div>
                                        <p>Total view: ${perNews.total_view ? perNews.total_view : 'No details available'}</p>
                                        <button type="button" class="btn btn-primary p-3" data-bs-toggle="modal" data-bs-target="#newsDetailModal"> + </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            newsDiv.appendChild(forEveryCards);

        });
        toggleSpinner(false);
    } else {
        let forEveryCards = document.createElement("div");
        forEveryCards.innerHTML = `
            <div id="news-card-container" class="d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-success p-4 m-5" disabled>NEWS not Available 😥 !</button>
            </div>
            `;
        newsDiv.appendChild(forEveryCards);
        toggleSpinner(false);
        sectionHiding(false);
    }
    console.log(singleNewsArray);
    displayIndividualNews(singleNewsArray);
};


const displayIndividualNews = async (news_id) => {
    console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}



const toggleSpinner = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

const sectionHiding = total => {
    const newsNumberSection = document.getElementById('news-count');
    if (total) {
        newsNumberSection.classList.remove('d-none');
    }
    else {
        newsNumberSection.classList.add('d-none');
    }
}

loadNews();

