const result = document.getElementById("result");
const filter = document.getElementById("filter");
let listItems;

async function getData() {

  try {
    const request = await fetch("https://randomuser.me/api/");
    const { results } = await request.json();
    const user = results[0];

    const userInfo = `
    <li>
      <figure>
        <img src="${user.picture.thumbnail}" alt="photo ${user.gender}">
      </figure>
      <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.country}, ${user.location.city}</p>
      </div>
    </li>
    `;

    result.innerHTML += userInfo;

    listItems = document.querySelectorAll("li");
    
  } catch(error) {
    console.log(error);
  }
  
}

for (let i=0; i<20; i++) {
  getData();
}

filter.addEventListener('input', e => filterData(e.target.value));
function filterData(searchTerm) {
  listItems.forEach(item => {
        if(item.childNodes[3].childNodes[1].innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    })
}