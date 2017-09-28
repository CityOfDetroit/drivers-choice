'use strict';
export default class Connector {
  constructor() {
    this.params = {
    }
  }
  static getData(URL, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open("GET", URL, true); // true for asynchronous
    xmlHttp.send(null);
  }
  static postData(ULR, data, success){
    var params = JSON.stringify(data);
    console.log(params);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', URL);
    xhr.onload  = function() {
      if (xhr.readyState>3 && xhr.status==200) {
        console.log('xhr success');
        success(xhr.response);
      }else{
        console.log('xhr error');
        document.querySelector('.invalid-phone-error-message').innerHTML = 'There was an error with your request. Please try again.';
        document.querySelector('.phone-invalid-alert').className = 'phone-invalid-alert active';
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener("error", function(e){
      console.log(e);
    });
    xhr.send(params);
    return xhr;
  }
}
