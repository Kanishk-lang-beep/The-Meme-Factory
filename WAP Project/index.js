// const container = document.getElementById("meme-container")
// const loader = document.getElementById("loader")

// loader.style.display = "block"
// fetch("https://api.imgflip.com/get_memes")
//   .then(res => res.json())
//   .then(data => {
//     loader.style.display = "none"
//     const memes = data.data.memes
//     memes.forEach(meme => {
//       const img = document.createElement("img")
//       img.src = meme.url
//       container.appendChild(img)
//     })
//   })
//   .catch(() => {
//     loader.innerText = "Error loading memes"
//   })


const container = document.getElementById("meme-container");
const loader = document.getElementById("loader")
const searchInput = document.getElementById("search")

let allMemes = []
loader.style.display = "block"

fetch("https://api.imgflip.com/get_memes")
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none"
    allMemes = data.data.memes
    displayMemes(allMemes)
  })
  .catch(() => {
    loader.innerText = "Error loading memes"
  })
function displayMemes(memes) {
  container.innerHTML = ""
  memes.forEach(meme => {
    const div = document.createElement("div")
    div.innerHTML = `
      <img src="${meme.url}" width="100%">
      <p>${meme.name}</p>
      <button onclick="addFav('${meme.id}')">❤️</button>
    `
    container.appendChild(div)
  })
}
searchInput.addEventListener("input", e => {
  const text = e.target.value.toLowerCase();

  const filtered = allMemes.filter(meme =>
    meme.name.toLowerCase().includes(text)
  )
  displayMemes(filtered)
})
function sortAZ() {
  const sorted = [...allMemes].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  displayMemes(sorted)
}
function addFav(id) {
  let favs = JSON.parse(localStorage.getItem("favs")) || []
  favs.push(id)
  localStorage.setItem("favs", JSON.stringify(favs))
  alert("Added to favorites ❤️")
}

const topBtn = document.getElementById("topBtn")
window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 100) {
    topBtn.style.display = "block"
  } else {
    topBtn.style.display = "none"
  }
})
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})
const themeBtn = document.getElementById("themeBtn")
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode")
  if (document.body.classList.contains("light-mode")) {
    themeBtn.innerText = "🌙 Dark Mode"
  } else {
    themeBtn.innerText = "☀️ Light Mode"
  }
})
