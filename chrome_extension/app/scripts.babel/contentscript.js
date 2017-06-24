'use strict';

console.log('content scripts!');



document.addEventListener('DOMContentLoaded', function () {
  var icon = document.querySelector('.add-position');
  console.log('loaded', icon);

  if(icon == null){
    setTimeout(function(){
      icon = document.querySelector('.add-position');

      icon.addEventListener('click', function(){
        console.log('clicked');

        setTimeout(function(){
          var btnSubmit = document.querySelectorAll('.form-submit-action')[1];
          console.log(btnSubmit)

          btnSubmit.addEventListener('click', function(){
            console.log('saved new job position');
            setTimeout(function(){

              chrome.runtime.sendMessage({type: 'jobchange'});
              console.log('Hey you just changed job!');

            }, 2000)
          });

        },2000);

      });
    }, 3000)
  }



})
