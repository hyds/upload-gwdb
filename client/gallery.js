(function(){

    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }

 var reader;
  var progress = document.querySelector('.percent');

  function abortRead() {
    reader.abort();
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

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
    }

    // Read in the image file as a binary string.
    reader.readAsBinaryString(evt.target.files[0]);
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

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


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(req) {
  var query = "http://127.0.0.1:8000";
  var xhr = createCORSRequest('POST', query);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
}

  function uploadFile(file){
    var url = 'http://127.0.0.1:8000';
    var xhr = new XMLHttpRequest();
    
    var fd = new FormData();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded
            console.log(xhr.responseText); // handle response.
        }
    };
    fd.append("upload_file", file);
    xhr.send(fd);
  
  }

  var uploadfiles = document.querySelector('#uploadfiles');
  
  uploadfiles.addEventListener('change', function () {
      var files = this.files;
      for(var i=0; i<files.length; i++){
          uploadFile(this.files[i]); // call the function to upload the file
      }
      for (var i = 0, f; f = files[i]; ++i) {
          console.log("name: ",f.name);
          console.log("type: ",f.type);
          console.log("size: ",f.size);
          console.log("lastMod:",f.lastModifiedDate.toLocaleDateString());
          uploadFile(f);
      }




  }, false);  


})();


