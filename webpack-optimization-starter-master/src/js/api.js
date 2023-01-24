export function getMotivationalPictures() {
    return new Promise(resolve => {
        setTimeout(() => {
            // const mockedResponse = [
            //     'images/img/pic1.jpeg',
            //     'images/img/pic2.png'
            // ];

            const mockedResponse = [
                'images/img/pic1.webp',
                'images/img/pic2.webp'
            ];
            resolve(mockedResponse);
        }, 1000);
    })
}