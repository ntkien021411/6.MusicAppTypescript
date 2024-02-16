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
