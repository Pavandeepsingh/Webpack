import imgFile from './img.jpg';

function addImage() {
    const img = document.createElement('img');
    img.alt = 'Hall of Fame';
    img.width = 600;
    img.src = imgFile;
    const body = document.querySelector('body');
    body.appendChild(img);
}


export default addImage;