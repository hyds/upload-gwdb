(function(){

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }



    function previewImage(file) {
        var galleryId = "gallery";

        var gallery = document.getElementById(galleryId);
        var imageType = /image.*/;

        if (!file.type.match(imageType)) {
            throw "File Type must be an image";
        }

        var thumb = document.createElement("div");
        thumb.classList.add('thumbnail');

        var img = document.createElement("img");
        img.file = file;
        thumb.appendChild(img);
        gallery.appendChild(thumb);

        // Using FileReader to display the image content
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }

    var uploadfiles = document.querySelector('#fileinput');
    uploadfiles.addEventListener('change', function () {
        var files = this.files;
        for(var i=0; i<files.length; i++){
            previewImage(this.files[i]);
        }

    }, false);

    

    function cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    }
    
    var drop   = document.getElementById('drop');
  
    // Tells the browser that we *can* drop on this target
    addEventHandler(drop, 'dragover', cancel);
    addEventHandler(drop, 'dragenter', cancel);

    addEventHandler(drop, 'drop', function (e) {
      e = e || window.event; // get window.event if e argument missing (in IE)   
      if (e.preventDefault) { e.preventDefault(); } // stops the browser from redirecting off to the image.

      var dt    = e.dataTransfer;
      var files = dt.files;
      for (var i=0; i<files.length; i++) {
        var file = files[i];
        var reader = new FileReader();
          
        //attach event handlers here...
        console.log("name : " + file.name);
        console.log("size : " + file.size);
        console.log("type : " + file.type);
        console.log("date : " + file.lastModifiedDate);
        console.log("----");
        
        //reader.readAsDataURL(file);
      }
      return false;
    });



    drop.addEventListener('change', function(){
        for ( var i = 0; i < this.files.length; i++){
            var file = this.files[i];
            // This code is only for demo ...
            console.log("name : " + file.name);
            console.log("size : " + file.size);
            console.log("type : " + file.type);
            console.log("date : " + file.lastModifiedDate);
            console.log("----");
            
        }
    }, false);




})();


function addEventHandler(obj, evt, handler) {
    if(obj.addEventListener) {
        // W3C method
        obj.addEventListener(evt, handler, false);
    } else if(obj.attachEvent) {
        // IE method.
        obj.attachEvent('on'+evt, handler);
    } else {
        // Old school method.
        obj['on'+evt] = handler;
    }
}

function abortRead() {
    reader.abort();
}

function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // Increase the progress bar length.
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}



  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }
