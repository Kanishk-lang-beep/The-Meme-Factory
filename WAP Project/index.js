const container = document.getElementById("meme-container")
const loader = document.getElementById("loader")

loader.style.display = "block"
fetch("https://api.imgflip.com/get_memes")
  .then(res => res.json())
  .then(data => {
    loader.style.display = "none"
    const memes = data.data.memes
    memes.forEach(meme => {
      const img = document.createElement("img")
      img.src = meme.url
      container.appendChild(img)
    })
  })
  .catch(() => {
    loader.innerText = "Error loading memes"
  })