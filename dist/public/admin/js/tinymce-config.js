const listTextareaMCE = document.querySelectorAll("[textarea-mce]");
if (listTextareaMCE.length > 0) {
  listTextareaMCE.forEach((textarea) => {
    const id = textarea.id;

    tinymce.init({
      // các thẻ textarea có class là textarea-mce' đều dc tinyMCE
      selector: `#${id}`,
      // Insert thêm ảnh vào textarea
      plugins: "image code",
      image_title:true,
      automatic_uploads:true,
      file_picker_types:"image",
      images_upload_url : "/admin/upload",
      // file_picker_callback: function (cb, value, meta) {
      //   var input = document.createElement("input");
      //   input.setAttribute("type", "file");
      //   input.setAttribute("accept", "image/*");

      //   input.onchange = function () {
      //     var file = this.files[0];

      //     var reader = new FileReader();

      //     reader.onload = function () {
      //       var id = "blobid" + new Date().getTime();
      //       var blobCahe = tinymce.activeEditor.editorUpload.blobCache;
      //       var base64 = reader.result.split(",")[1];
      //       var blobInfo = blobCahe.create(id, file, base64);
      //       blobCahe.add(blobInfo);

      //       cb(blobInfo.blobUri(), { title: file.name });
      //     };
      //     reader.readAsDataURL(file);
      //   };
      //   input.click();
      // },
      // content_style:
      //   "body {font-family:Helvetica,Arial,sans-serif; font-size:14px}",
    });
  });
}
