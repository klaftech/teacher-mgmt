///////////////////////////////////////////////////////
// booklist functions
//////////////////////////////////////////////////////

const bookMenu = document.querySelector("div#all-books")
const baseUrl = "https://openlibrary.org" //search.json?q=javascript&fields=*,availability&limit=1
const coverImgUrl = "https://covers.openlibrary.org"

function getJSON(url){
    const requestObj = {
        method: 'GET',
        redirect: 'follow'
    }
    return fetch(url,requestObj)
    .then((response) => response.json())
    .catch((error) => console.error(error))    
}

async function fetchImage(url) {
    const img = new Image();
    return new Promise((res, rej) => {
        img.onload = () => res(img);
        img.onerror = e => rej(e);
        img.src = url;
    });
}


const getBookCoverImage = (coverId) => {
    const coverUrl = `${coverImgUrl}/b/id/${coverId}-M.jpg`
    return getJSON(coverUrl)
    .then((data) => {
        console.log(data)
        //data.forEach(renderBook(data))
        
        //console.log(data.docs)
        //const data[docs]
        // for(const book of data.docs){
        //     //console.log(book)
        //     renderBook(book)
        // }
    })


}

const renderBook = async (book) => {
    console.log(book)
    /*
    <div class="book-listing">
        <div class="book-info">                   
            <h2>book title</h2>
            <p>author</p>
            <img src="./img/about-me/hiking.jpg" alt="Going for a hike">
            <div class="overlay">
                <p>add book description here</p>
            </div>
        </div>
        
        <button>add book to curriculum</button>
    </div>
    */
    
    const bookListing = document.createElement("div")
    bookListing.classList.add("book-listing")

    const bookInfo = document.createElement("div")
    bookInfo.classList.add("book-info")

    const curriculumBtn = document.createElement("button")
    curriculumBtn.innerText = "add book to curriculum"
    
    const bookTitle = document.createElement("h2")
    const bookAuthor = document.createElement("p")
    const bookImg = document.createElement("img")
    const bookImgDiv = document.createElement("div")
    bookImgDiv.classList.add("overlay")
    bookImgDiv.append(bookImg)
    
    bookInfo.append(bookTitle)
    bookInfo.append(bookAuthor)
    bookInfo.append(bookImgDiv)
    bookListing.append(bookInfo)
    bookListing.append(curriculumBtn)
    bookMenu.append(bookListing)
    
    bookTitle.innerText = book.title
    bookAuthor.innerText = book.author_name[0]

    const img = await fetchImage('https://covers.openlibrary.org/b/id/12547191-L.jpg');
    console.log(img)
    //const w = img.width;
    //const h = img.height;
    //bookImg.src = getBookCoverImage(book.cover_i)
    bookImg.alt = `${book.title} cover image`
}

const renderDefaultBookMenu = () => {
    getJSON(baseUrl+"/search.json?q=javascript&fields=*,availability&limit=2")
    .then((data) => {
        //data.forEach(renderBook(data))
        
        //console.log(data.docs)
        //const data[docs]
        for(const book of data.docs){
            //console.log(book)
            renderBook(book)
        }
    })
}

