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
  })
}
//End APlayer


// Like Song
const buttonLike = document.querySelector("[button-like]");
if(buttonLike){
    buttonLike.addEventListener("click" , ()=> {
        const id = buttonLike.getAttribute("button-like");
        const isActive =buttonLike.classList.contains("active");
        const typeLike = isActive ? "dislike" : "like";
        const link =`/songs/like/${typeLike}/${id}`;

        const option ={
            method : "PATCH"
        }
        fetch(link,option)
        .then(res => res.json())
        .then(data =>{
            const span  = buttonLike.querySelector("span");
            span.innerHTML = data.like + " thích";
            buttonLike.classList.toggle("active");
        })
    });
}
// End Like Song