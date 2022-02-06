import refs from './js/refsPictures';
import debounce from 'lodash.debounce';
import FetchPictures from './js/fetchPictures';
import alert from './js/notificationPictures';
import updatePictrures from './js/updatePictures';

const fetchPictures = new FetchPictures();

refs.inputForm.addEventListener('input', debounce(searchPictures, 1000));
refs.searchForm.addEventListener('submit', startSearch);
refs.loadMoreBtn.addEventListener('click',loadMore)


function searchPictures(e) {

    fetchPictures.query = e.target.value;
    refs.cardContainer.addEventListener('click',searchForm)

    if (fetchPictures.query) {
        clearPictures();
        e.target.value = "";
    }
    if (fetchPictures.query === 0) {
        clearPictures();
        return alert({
            type: 'info',
            text: 'Ничего не найдено 🔎',
            delay: 500,
            width: '300px',
            maxTextHeight: null,
        });
    }
    if(!fetchPictures.query){
      return alert({
        text: 'Opps! No request! Try again!',
        type: 'error',
        delay: 1000,
        hide: true,
      })
    }; 
 
    fetchPictures.resetPage();
    clearPictures();
    fetchArticles()
}


function searchForm(e) {
    e.preventDefault();
    fetchPictures.query = e.target.value;
    refs.cardContainer.addEventListener('click',searchForm)
    fetchPictures.fetchQuary()
    fetchPictures.resetPage();
    clearPictures();
    fetchArticles()
    refs.searchForm.value = e.target.textContent;
    refs.inputForm.value = '';
    refs.cardContainer.removeEventListener('click',searchForm)
}

function startSearch(e) {
    e.preventDefault();
    fetchPictures.query = e.currentTarget.elements.query.value;
    refs.cardContainer.addEventListener('click',searchForm)
    fetchPictures.resetPage();
    clearPictures();
    fetchArticles();
}

function loadMore() {
    fetchPictures.fetchQuary()
        .then(hits => {
        updatePictrures(hits)
        })
    smoothScroll();
}
function fetchArticles() {
    fetchPictures.fetchQuary()
        .then(hits => {
        updatePictrures(hits) 
    })
}
function clearPictures() {
    refs.cardContainer.innerHTML = '';
}

function smoothScroll(){
  refs.cardContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}