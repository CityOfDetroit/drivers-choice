'use strict';
import Map from './map.class.js';
// import Candidate from './candidate.class.js';
import Connector from './connector.class.js'
(function(){
  window.onload = function() {
    var changeRadioButtons = function changeRadioButtons(ev){
    console.log(ev);
      if(ev.target.className === "radio-btn"){
        document.querySelector('.radio-btn.active').className = 'radio-btn';
        ev.target.className = 'radio-btn active';
      }
    }
    var calculateNewPolicy = function calculateNewPolicy(){
      var policyType = null
      var radios = document.getElementsByName('ins_type');
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          policyType = radios[i].id;
          break;
        }
      }
      console.log('policy type is ' + policyType);
      var totalPolicyPremium = document.getElementById('tpp').value;
      var personalInjuryProteccion = document.getElementById('pip').value;
      var mcca = document.getElementById('mcca').value;
      var time = document.querySelectorAll('input[type="radio"]');
      var selectedTime = null;
      for (var i = 0; i < time.length; i++) {
        if(time[i].checked){
          selectedTime = time[i].id;
        }
      }
      switch (true) {
        case totalPolicyPremium === '':
          alert("Enter your current Total Premium Cost");
          break;
        case personalInjuryProteccion === '':
          alert("Enter your current Personal Injury Protection Charge");
          break;
        case mcca === '':
          alert("Enter your current MCCA fee");
          break;
        default:
          console.log(parseInt(personalInjuryProteccion));
          console.log(parseInt(mcca));
          console.log( parseInt(totalPolicyPremium));
          // For seniors: PIP and MCCA are reduced by 85%.
          var personalInjuryProteccionSavings = null;
          if (policyType === 'senior'){
            personalInjuryProteccionSavings = parseInt(personalInjuryProteccion) * 0.85;
          }else{
            personalInjuryProteccionSavings = parseInt(personalInjuryProteccion) * 0.4;
          }
          var mccaSavings = parseInt(mcca) * 0.4;
          var totalCashSavings = personalInjuryProteccionSavings + mccaSavings;
          var percentageSavings = Math.round((totalCashSavings / parseInt(totalPolicyPremium)) * 100);
          var yearSavings = null;
          if(selectedTime === '6-months'){
            yearSavings = totalCashSavings * 2;
          }else{
            yearSavings = totalCashSavings;
          }
          document.getElementById('tps').innerHTML = percentageSavings + '%';
          document.getElementById('tas').innerHTML = "$" + yearSavings;
      }
    };
    document.getElementById('calculate-btn').addEventListener('click', calculateNewPolicy);
      var radioButtonList = document.querySelectorAll('.radio-btn');
      for (var i = 0; i < radioButtonList .length; i++) {
        radioButtonList[i].addEventListener('click',function(ev){
        changeRadioButtons(ev);
      });
    }
  };
  var map = new Map({
    styleURL: 'mapbox://styles/cityofdetroit',
    mapContainer: 'map',
    geocoder: true,
    baseLayers: {
      street: 'cj7w0s5do3kj82rpcsqovntai',
      satellite: 'cj774gftq3bwr2so2y6nqzvz4'
    },
    interactive: true,
    center: [-83.15, 42.36],
    zoom: 11.5,
    boundaries: {
      sw: [-83.3437,42.2102],
      ne: [-82.8754,42.5197]
    },
    sources: [
    ],
    layers: [
    ]
  });
  // let toggleDisplay = function toggleDisplay(e){
  //   console.log(e);
  //   console.log(e.target.parentElement.childNodes[3].className);
  //   (e.target.parentElement.childNodes[3].className === 'accordion-content active') ? e.target.parentElement.childNodes[3].className = 'accordion-content' : e.target.parentElement.childNodes[3].className = 'accordion-content active';
  // };
  // let sectionBtns = document.querySelectorAll('.accordion-btn');
  // sectionBtns.forEach(function(btn) {
  //   btn.addEventListener('click', function(e){
  //     toggleDisplay(e);
  //   });
  // });
  console.log(map);
})(window);
