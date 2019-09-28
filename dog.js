const DOG_URL = "https://dog.ceo/api/breeds/image/random/";

const BREEDS_LIST_URL = "https://dog.ceo/api/breeds/list/all";

const DOG_URL_BY_BREED_PREFIX = "https://dog.ceo/api/breed/";

const DOG_URL_BY_BREED_SUFFIX = "/images/random"

let breedsList = {};

const doggos = document.querySelector('.doggos');

const button = document.querySelector('.main-btn');

const spinner = document.querySelector('.spinner');

const selector = document.querySelector('.breed-select');

button.addEventListener("click",addDoggos);

getBreedsList();

function getBreedsList() {
    const promise = fetch(BREEDS_LIST_URL);
    promise
        .then(function(response) {
            processingPromise = response.json();
            return processingPromise;
        })
        .then(function(processedPromise) {
            breedsList = processedPromise.message;
            updateSelect(breedsList);
            document.querySelector('.breed-select').removeAttribute("disabled");
        })
}

function updateSelect(breedsList){
    const listCache = document.createElement("select");
    listCache.name = selector.name;
    selector.classList.forEach(function (c) {
        listCache.classList.add(c);
    });
    const optionAll = document.createElement("option");
    const listParent = selector.parentNode;
    optionAll.value = "";
    optionAll.innerText = "all breed";
    listCache.appendChild(optionAll);
    for (breed in breedsList) {
        if (breedsList[breed].length === 0) {
            const breedOption = document.createElement("option");
            breedOption.value = breed;
            breedOption.innerText = breed;
            listCache.appendChild(breedOption);
        } else if (breedsList[breed].length > 0) {
            const breedOptgroup = document.createElement("optgroup");
            breedOptgroup.label = breed;
            const subOptionAll = document.createElement("option");
            subOptionAll.value = breed;
            subOptionAll.innerText = "all " + breed;
            breedOptgroup.appendChild(subOptionAll);
            breedsList[breed].forEach(function (subbreed) {
                const subOption = document.createElement("option");
                subOption.value = breed + "/" +subbreed;
                subOption.innerText = subbreed;
                breedOptgroup.appendChild(subOption);
            })
            listCache.appendChild(breedOptgroup);
        }
    }
    selector.remove();
    listParent.appendChild(listCache);

}

function addDoggos() {
    const selectedBreed = document.querySelector('.breed-select').selectedOptions[0].value;
    let url = DOG_URL;
    if (selectedBreed !== "") {
        url = DOG_URL_BY_BREED_PREFIX + selectedBreed + DOG_URL_BY_BREED_SUFFIX;
    }
    const promise = fetch(url);
    promise
    .then(function (response) {
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(function (processedResponse) {
        const img = document.createElement("img");
        img.src = processedResponse.message;
        img.alt = "Cute Dog: " + selectedBreed.replace("/"," ");
        img.classList.add("dog-img");
        addMotion(img);
        doggos.appendChild(img);
        spinner.setAttribute("style","");
    });
    spinner.setAttribute("style","display: block");
}

const { styler, spring, listen, pointer, value } = window.popmotion;

function addMotion(img) {
    const divStyler = styler(img);
    const imgXY = value({ x: 0, y: 0 }, divStyler.set);

    listen(img, 'mousedown touchstart')
    .start((e) => {
        e.preventDefault();
        pointer(imgXY.get()).start(imgXY);
    });

    listen(document, 'mouseup touchend')
    .start(() => {
        spring({
        from: imgXY.get(),
        velocity: imgXY.getVelocity(),
        to: { x: 0, y: 0 },
        stiffness: 200,
        // mass: 1,
        // damping: 10
        }).start(imgXY);
    });
}
