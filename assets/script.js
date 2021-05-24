
function insertReferrerPolicy(tag) {
  var policy = "referrerpolicy='no-referrer-when-downgrade'"
  return tag.replace(/(script async)/, `$1 ${policy}`)
}

// tracker tags look like
// <script async src='https://tag.simpli.fi/sifitag/b7c57f80-178c-0137-e079-06a9ed4ca31b'></script>
// so we're finding the part like `sifitag/b7c57f80-178c-0137-e079-06a9ed4ca31b` and replacing with
// that same part + the referer policy.
// To be more robust we should parse out the `src` attribute into a proper URL object
// and then add in the referer query parameter to the object and then re-stringify it.
function insertRefererParameter(tag, ref) {
  var tagMatcher = /(sifitag\/[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})/
  return tag.replace(tagMatcher, `$1?referer=${ref}`)
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
