let downloadbtn = document.querySelector(".download");
let openbtn = document.querySelector(".open");

downloadbtn.addEventListener("click", function(e){
  let jsonData = JSON.stringify([cellstorage]);
  let file = new Blob([jsonData], {type : "application/json"})
let a = document.createElement("a");
a.href = URL.createObjectURL(file);
a.download = "Jason.json";
a.click();
})

openbtn.addEventListener("click", function(){
    let input = document.createElement("input");
    input.setAttribute("type" , "file");
    input.click();
    input.addEventListener("change", function(){
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load", function(){
            let readSheetData = JSON.parse(fr.result);
            sheetadd.click();
            cellstorage = readSheetData[0];
            sheetstorage[sheetstorage.length - 1] = cellstorage;
            handlecell();
        })
    })
})