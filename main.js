
const list = document.querySelector('.main__list')
let timerId
const getGiphyApi = (searchValue) => {

    const apiKey = 'zllX3wka09igvHnzldvV7MkpFKM7hqPc';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchValue}`

    list.innerHTML = ''

    fetch(apiUrl).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = response.json()

        return data
    }).then(data => {
        if (data && data.data){
            let arrData = data.data

            arrData.forEach(item => {

                let li = document.createElement('li')
                li.classList.add('main__item')
                let img = document.createElement('img')
                img.classList.add('main__item-img')
                const imageUrl = item.images.original.url

                img.src = imageUrl

                li.appendChild(img)
                list.appendChild(li)
            })
        }
    })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}


const searchInput = document.querySelector('.header__input')

searchInput.addEventListener('input', () => {
    clearTimeout(timerId)
    const inputValue = searchInput.value.trim()

    if (inputValue.length >= 3){
        timerId = setTimeout(() => {
            getGiphyApi(searchInput.value)
        }, 1000)
    }
})




