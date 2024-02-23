let pics = document.querySelector(".pics");
let loadBtn = document.querySelector('.load');
let searchInput = document.querySelector('#searchInput');
let currentPage = 1;
let perPage = 12;
let searchTerm = null;
// console.log(`jay shree ram`);
let apiLink = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;

const apiKey = "GecT4I3zvkKUsPNYYL2qRZLW2HIXo0P18Krswewz1IwgOEoLNA01gEbF";


const downloadImg =(imgdownload) =>{
    fetch(imgdownload).then(res => res.blob()).then(blob => {
        let anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = new Date().getTime();
        anchor.click();
    })
}

const genratePics = (img) => {
  console.log(img);
  pics.innerHTML += img.map(
    (picdata) =>
      `<li class="pic_list">
        <img src="${picdata.src.large2x}" alt="" />

        <div class="details">
          <div class="top_details_header">
            <button><i class="fa fa-clone" aria-hidden="true"></i></button>
            <button><i class="fa fa-heart-o" aria-hidden="true"></i></button>
          </div>
          <div class="bottom_details_header">
            <div class="shooter">
              <img src="${picdata.src.large2x}" alt="">
              <h6>${picdata.photographer}</h6>
            </div>
            <button onclick = "downloadImg('${picdata.src.large2x}')"><i class="fa fa-download" aria-hidden="true"></i></button>
          </div>
        </div>
      </li>`
  );
};

//define the getImages function
const getImages = (img) => {
  fetch(img, { headers: { Authorization: apiKey } })
    .then((res) => res.json())
    .then((result) => genratePics(result.photos));
};

getImages(apiLink);

loadBtn.addEventListener('click', () =>{
    currentPage++;
    let apiurl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;

    apiurl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}` : apiurl;
    getImages(apiurl);
})

searchInput.addEventListener('keyup',(e)=>{

    if(e.target.value === ""){
        return null;
    }

   if(e.key === "Enter"){
    currentPage = 1;
    pics.innerHTML = "";
    searchTerm = e.target.value;
    let searchApi = `https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=${perPage}`;
    getImages(searchApi);
    e.target.value ="";
   }

})
