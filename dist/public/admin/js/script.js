// Hiện ảnh khi tạo sản phẩm
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(file){
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })

}


// Hiện audio để nghe thử
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
  const uploadAudioInput = document.querySelector("[upload-audio-input]");
  const uploadAudioPlay = document.querySelector("[upload-audio-play]");

  const source = uploadAudio.querySelector("source");
  uploadAudioInput.addEventListener("change",(e)=>{
    if(e.target.files.length){
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio

      uploadAudioPlay.load();

    }
  })

}


//