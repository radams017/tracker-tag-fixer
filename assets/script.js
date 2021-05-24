// collect and fix tags for GTM
function fixGTM(){
    var gtmTag = prompt("Paste tag code below.");
    var referrer = prompt("Paste referrer to add/encode below.");
    var encodedReferrer = '?referer=' + encodeURIComponent(referrer);
    var insert = (main_string, ins_string, pos) => {
        if(typeof(pos) == 'undefined') {
        var result = '';
            pos = 0;
        } if(typeof(ins_string) == 'undefined') {
            ins_string = '';
        } result = main_string.slice(0, pos) + ins_string + main_string.slice(pos);
        return result;
    }
    return insert(gtmTag, encodedReferrer, 85);
};

// collect and fix tags for non-GTM
function fixNonGTM(){
    var noGTMTag = prompt("Paste tag code below.");
    var insert = (main_string, ins_string, pos) => {
        if(typeof(pos) == 'undefined') {
        var result = '';
            pos = 0;
        } if(typeof(ins_string) == 'undefined') {
            ins_string = '';
        } result = main_string.slice(0, pos) + ins_string + main_string.slice(pos);
        return result;
    }
    return insert(noGTMTag, "referrerpolicy='no-referrer-when-downgrade' ", 14);
}

// write GTM tag to text box
function writeGTMTag(){
    var newTag = fixGTM();
    var newTagText = document.querySelector("#tag");
    newTagText.value = newTag;
}

// write non-GTM tag to text box
function writeNonGTMTag(){
    var newTag = fixNonGTM();
    var newTagText = document.querySelector("#tag");
    newTagText.value = newTag;
}

// clear content from text box
function clearContent(){
    var noText = '';
    var noTextContent = document.querySelector('#tag');
    noTextContent.value = noText;
}

// add event listener to generate button
var generateGTMBtn = document.querySelector("#GTM");
var generateNonGTMBtn = document.querySelector("#NO-GTM");
var generateClearButton = document.querySelector("#CLEAR");

generateGTMBtn.addEventListener("click", writeGTMTag);
generateNonGTMBtn.addEventListener("click",writeNonGTMTag);
generateClearButton.addEventListener("click", clearContent);