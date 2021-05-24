
function insertReferrerPolicy(tag) {
  var policy = "referrerpolicy='no-referrer-when-downgrade'"
  return tag.replace(/script async/, `script async ${policy}`)
}

function insertRefererParameter(tag, ref) {
  var tagMatcher = /(sifitag\/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})/
  return tag.replace(tagMatcher, `$1?referer=${}`)
}

function fixGTM(){
  var gtmTag = prompt('Paste tag code below.')
  var referrer = prompt('Paste referrer to add/encode below.')
  return insertRefererParameter(gtmTag, encodeURIComponent(referrer))
};

function fixNonGTM(){
  var noGTMTag = prompt('Paste tag code below.')
  return insertReferrerPolicy(noGTMTag)
}

function writeGTMTag(){
  document.querySelector('#tag').value = fixGTM()
}

function writeNonGTMTag(){
  document.querySelector('#tag').value = fixNonGTM()
}

function clearContent() {
  document.querySelector('#tag').value = ''
}

document.querySelector('#GTM').addEventListener('click', writeGTMTag)
document.querySelector('#NO-GTM').addEventListener('click',writeNonGTMTag)
document.querySelector('#CLEAR').addEventListener('click', clearContent)
