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
const cardDiv = document.getElementById("card-container");
const spinner = document.getElementById("spinner");
loadNews = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories;`
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data.news_category);
    }
    catch {
        console.log('error occured');
    }

};

const displayNews = (news) => {
    const newsContainer = document.getElementById("news-container");

    news.forEach((oneCategory) => {
        const newsli = document.createElement("li");
        const id = oneCategory.category_id;
        const newsName = oneCategory.category_name;
        newsli.innerHTML = `
        <button class="btn" id="nav_btn" onclick="clickedBtn(${id})">${newsName}</button>
        `;
        newsContainer.appendChild(newsli);
    });
};

const clickedBtn = (btnId) => {
    //spinner start
    toggleSpinner(true);
    try {
        let formatedBtnId = "0" + btnId;
        clickNews(formatedBtnId);
        cardDiv.appendChild((cardDiv.innerHTML = "<div></div>"));
    } catch {
        console.log("error 404");
    }
};

const clickNews = async (category_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id};`
        const res = await fetch(url);
        const data = await res.json();

        const allNewsOnThatCategory = data.status
            ? data.data[0]._id
            : "NEWS not Available 😥 !";
        const news = data.data;

        everyNewsCard(news);
    }
    catch {
        console.log('error 404');
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
                    <div id="news-card-container" class="card mb-5">
                        <div class="row ">
                            <div class="col-4">
                                <img src="${perNews.image_url}" class="img-fluid rounded-start h-100" alt="...">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="card-title mb-2">${perNews.title}</h5>
                                    <p class="card-text  mb-5">${perNews.details.slice(0, 200) + '...'}</p>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <img src="${perNews.author.img}" class="author-picture" alt="...">
                                            <p>${perNews.author.name ? perNews.author.name : 'No Author Found'}</p>
                                        </div>
                                        <p>Total view: ${perNews.total_view ? perNews.total_view : 'No details available'}</p>
                                        <button type="button" class="btn btn-primary modal-btn" data-bs-toggle="modal" data-bs-target="#newsDetailModal"> --> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
            cardDiv.appendChild(forEveryCards);

        });
        toggleSpinner(false);
    } else {
        let forEveryCards = document.createElement("div");
        forEveryCards.innerHTML = `
            <div id="news-card-container" class="d-flex justify-content-center align-items-center">
            <button class="btn btn-outline-success p-4 m-5" disabled>NEWS not Available 😥 !</button>
            </div>
            `;
        cardDiv.appendChild(forEveryCards);
        toggleSpinner(false);
        sectionHiding(false);
    }
    // console.log(singleNewsArray);
    displayIndividualNews(singleNewsArray);
};


const displayIndividualNews = async (news_id) => {
    console.log(news_id);
    const url = `https://openapi.programming-hero.com/api/news/${news_id};`
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
