//APlayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    autoplay: true,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
      },
    ],
  });
  const avatar = document.querySelector(".singer-detail .inner-avatar ");
  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });
  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });
  ap.on("ended", function () {
    // console.log("kết thúc");
    const link = `/songs/listen/${dataSong._id}`;
    // console.log(link);
    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const elementListenSpan = document.querySelector(".singer-detail .inner-listen span");
        elementListenSpan.innerHTML = `${data.listen} lượt nghe`;
      });
  });
}
//End APlayer

// Like Song
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const id = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");
    const typeLike = isActive ? "dislike" : "like";
    const link = `/songs/like/${typeLike}/${id}`;

    const option = {
      method: "PATCH",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const span = buttonLike.querySelector("span");
        span.innerHTML = data.like + " thích";
        buttonLike.classList.toggle("active");
      });
  });
}
// End Like Song

// Favorite Song
const buttonFavorite = document.querySelectorAll("[button-favorite]");
if (buttonFavorite) {
  buttonFavorite.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(123);
      const id = item.getAttribute("button-favorite");
      const isActive = item.classList.contains("active");
      const typeFavorite = isActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${id}`;
      // console.log(link);
      const option = {
        method: "PATCH",
      };
      fetch(link, option)
        .then((res) => res.json())
        .then((data) => {
          item.classList.toggle("active");
        });
    });
  });
}
// End Favorite Song

// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  input.addEventListener("keyup", (e) => {
    const keyword = input.value;
    const boxSuggest = boxSearch.querySelector(".inner-suggest");

    const link = `/search/suggest?keyword=${keyword}`;
    const option = {
      method: "GET",
    };
    fetch(link, option)
      .then((res) => res.json())
      .then((data) => {
        const songs = data.songs;
        if (songs.length > 1) {
          boxSuggest.classList.add("show");
          const htmls = songs.map((song) => {
            return `
              <a class="inner-item" href="/songs/detail/${song.slug}">
                <div class="inner-image"><img src="${song.avatar}" /></div>
                <div class="inner-info">
                    <div class="inner-title">${song.title}</div>
                    <div class="inner-singer"><i class="fa-solid fa-microphone-lines"> </i> ${song.infoSinger.fullName}</div>
                </div>
              </a>
                `;
          });
          const boxList = boxSuggest.querySelector(".inner-list");
          boxList.innerHTML = htmls.join("");
        } else {
          boxSuggest.classList.remove("show");
        }
      });
  });
}
//End  Search Suggest
