const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const selectTag = document.querySelectorAll("select");
translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries){
        //selecting English by default as FROM language Hindi as to language
        let selected;
       // console.log(countries[country_code]);
        if(id == 0 && country_code == "en-GB"){
selected = "selected";
        } else if( id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option); // adding options tag inside select tag
    }
});
//
exchangeIcon.addEventListener("click", () => {
    //exchanging textarea and select tag value
let tempText = fromText.value,
tempLang = selectTag[0].value;
fromText.value = toText.value;
 selectTag[0].value  = selectTag[1].value;
toText.value = tempText;
selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value;  // getting toSelect tag value
    console.log(text, translateFrom, translateTo);
    if(!text) return;
    toText.setAttribute("placeholder", "translation")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching api url responseand returning  it with parsing into js obj
    //and in another then method receiving that obj
    //NB: it is a free api sometimes translated text may not be accurate 
    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
});


icons.forEach(icon => {
  icon.addEventListener("click",({target}) => {
    console.log(target);
    if (target.classList.contains("bx-copy")){
        //if clicked icon has from id, copy the fromTextarea value else copy the textarea value
        if(target.id == "from"){
                console.log("from copy icon clicked!!");
                navigator.clipboard.writeText(fromText.value);
        } else {
            console.log("to copy icon clicked!!") ;
            navigator.clipboard.writeText(toText.value)
        }  
    } else {
        let utterance;
        // if clicked icon from id, speak the fromTextarea value else speak the toTextArea value
        console.log("speech icon clicked!! ");
        if(target.id == "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value; //setting utterance language to fromSelect tag value
    } else {
        utterance = new SpeechSynthesisUtterance(toText.value);
        utterance.lang = selectTag[1].value; //setting utterance language to toSelect tag value
    }   
    speechSynthesis.speak(utterance); //speak the passed utterance
    }
  });
});

