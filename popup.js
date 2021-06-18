function checkInStorage(str) {
  const files = JSON.parse(localStorage.getItem("files"));
  // let questions = []
  files.forEach((file) => {
    if (file.includes(str) || file.includes(str.toUpperCase()) || file.includes(str.toLowerCase()) || file.includes(capitalizeFirstLetter(str))) {
      // questions.push(file)
      var newcontent = document.createElement('div');
      console.log(file)
      if (str) {
        file = file.replace(str.toUpperCase(), `<b style="color: red">${str.toUpperCase()}</b>`);
        file = file.replace(str.toLowerCase(), `<b style="color: red">${str.toLowerCase()}</b>`);
        file = file.replace(capitalizeFirstLetter(str), `<b style="color: red">${capitalizeFirstLetter(str)}</b>`);
      }
      var split = file.split("\n");
      var ans = split[0]
      ans = ans.replace('X', '')
      ans.split('').forEach((char, index) => {
        console.log(char)
        if(char==1){
          console.log(split[index+2])
          file = file.replace(split[index+2], `<i style="color: green">${split[index+2]}</i>`)
        }
      })
      // console.log(split[3])
      file = `<p>${file}</p>`
      // console.log(file)
      file = file.replace(/\r/g, '<br>');
      // console.log(file)
      newcontent.innerHTML = file
      message.appendChild(newcontent.firstChild);
      message.appendChild(document.createElement('hr'));
    }
  })
  // message.innerText = questions
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function onWindowLoad() {
  var message = document.querySelector("#message");
  var dir = document.querySelector("#dir");
  var clearButton = document.querySelector("#clear");
  clearButton.onclick = function () { localStorage.clear(); }
  const files = localStorage.getItem('files');
  if (files) {
    dir.style.display = 'none';
  } else {
    message.style.display = 'none';
    clearButton.style.display = 'none';
  }
  var filesText = []
  dir.addEventListener('change', () => {
    Array.from(dir.files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = event => { console.log(event.target.result); filesText.push(event.target.result); localStorage.setItem("files", JSON.stringify(filesText)); }
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
  });

  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, function (selection) {
    var selected = selection[0];
    console.log(selected)
    checkInStorage(selected)
  });
}
window.onload = onWindowLoad;
