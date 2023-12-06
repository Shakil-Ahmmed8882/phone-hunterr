const loadData = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  let tem = data.data;
  show(tem, isShowAll);
};

const container = document.getElementById("parent");

function show(phone, isShowAll) {
  // show all button if there are more than 12 phones in result
  const showButton = document.querySelector("[data-show-all]");
  // This logic is for if the phones length over twelves
  if (phone.length > 12 && !isShowAll) {
    showButton.classList.remove("hidden");
  } else {
    showButton.classList.add("hidden");
  }

  if (!isShowAll) {
    phone = phone.slice(0, 9);
  }

  phone.forEach((element) => {
    const div = document.createElement("div");
    // console.log(element);
    div.classList = "card card-compact w-96 bg-base-100 shadow-xl text-center";
    div.innerHTML = `
    <div class="bg-gray-900 p-8 rounded-lg">
    <figure><img src="${element.image}" /></figure>
    <div class="card-body space-y-2">
    <h2 class="text-center text-2xl text-bold">${element.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
    <button onclick='handleShowDetail("${element.slug}");displayDetail.showModal()' class="btn btn-primary">Buy Now</button>
    </div>
    </div>
    </div>
    `;
    // console.log(element);
    container.appendChild(div);
  });

  toggleLoadingSpinner(false);
}

function searchResult(isShowAll) {
  const searchText = document.querySelector('[data-search="button"]').value;
  // supplying the argument for search
  loadData(searchText, isShowAll);
  // clear the previous result
  container.innerHTML = "";

  toggleLoadingSpinner(true);
}

function toggleLoadingSpinner(isLoading) {
  const spinner = document.querySelector("[data-spinner]");

  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
}

// show all button
function handleShowAll() {
  searchResult(true);
}

// handle show detail button
const handleShowDetail = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  handlePhoneDetails(phone);
};

// handle modal
const handlePhoneDetails = (phone) => {
  console.log(phone);

  const displaySize = document.querySelector("[data-display-size]");
  const phoneImage = document.querySelector("[data-phone-image]");
  const phoneTitle = document.querySelector("[data-phone-name]");
  const phoneChipset = document.querySelector("[data-chipset]");
  phoneTitle.innerText = `Name: ${phone.name}`;
  displaySize.innerText = `display-size: ${phone.mainFeatures.displaySize}`;
  phoneImage.src = phone.image;
  phoneChipset.innerText = phone.mainFeatures.chipSet;
};

// invoking just for testing purpose
loadData();
