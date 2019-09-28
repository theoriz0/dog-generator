const DOG_URL = "https://dog.ceo/api/breeds/image/random/";

const doggos = document.querySelector('.doggos')

const button = document.querySelector('.main-btn');

const spinner = document.querySelector('.spinner');

button.addEventListener("click",addDoggos);

function addDoggos() {
    const promise = fetch(DOG_URL);
    promise
    .then(function (response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function (processedResponse) {
        const img = document.createElement("img");
        img.src = processedResponse.message;
        img.alt = "Cute Dog";
        img.classList.add("dog-img");
        doggos.appendChild(img);
        spinner.setAttribute("style","");
    });
    spinner.setAttribute("style","display: block");
}