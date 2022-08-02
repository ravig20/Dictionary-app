let input = document.querySelector("#search-input");
let  main_contant= document.getElementById("#main-contant");
let text_of = document.getElementById("text-of");
let searchtBtn = document.querySelector("#submit-input");
let mike = document.querySelector("#mike");
// let loding = document.querySelector("#loding");
let speak = document.querySelector("#speak");
let resultData; // strooing api data
speak.addEventListener("click",voice);



searchtBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    // get input data
    let word = input.value;
    if(word ===""){
        alert("search box is emty");
        return;
    }
    //call api
    callApi(word);
    
    
})
async function callApi(word){
    console.log(word)
    document.querySelector("#loding").style.display="block";
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    let result = await data.json();
    if(result){
        document.querySelector("#loding").style.display="none";
        document.getElementById("#main-contant").style.display = "none";
        document.querySelector("#not_found").style.display = "block";

    }
    resultData= await result[0].meanings[0].definitions[0].definition;
    document.querySelector("#loding").style.display="none";
    document.getElementById("#main-contant").style.display = "block";
    document.querySelector("#not_found").style.display = "none";
    text_of.innerText = resultData ;

    console.log(result);
  
}

// mike functionality

mike.addEventListener("click", ()=>{
    
    var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
         

        document.getElementById("search-input").value = transcript;
        
       
        
        console.log(transcript);
    });
    
    if (speech == true) {
        recognition.start();
    }
})
function voice(){
    let speech = new SpeechSynthesisUtterance(resultData);
    speechSynthesis.speak(speech);
    console.log(resultData);
  
   
}

