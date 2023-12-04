//Get Quotes From API to do that we are going to use asynchronous fetch request within a try catch statement
//asynchronous function can run at any time independently and it will stop the browser from completing the loading the page
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
    loader.hidden= true;
    quoteContainer.hidden = false;
}

//Show new quote
function newQuote() {
    loading();
    //Pick a random quote from an api array
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author){
         authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if(quoteText.textContent.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes() {
    loading();
    const apiUrl ='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl); // response will not be populated until we get somedata from the api
        // console.log(response);
        
        apiQuotes = await response.json(); // response is actually bunch of strings that we need to transform to javascript object and assign to a global variable apiQuotes
        newQuote();
    }catch (error){
        //Catch error here
    }
}
//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.t}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
// On Load
getQuotes();
// loading();