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
