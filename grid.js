let row = 26;
let col = 100;
let sheetstorage = [];
let colcont = document.querySelector(".col-cont");

let cellstorage = [];

// for(let i = 0; i<col; i++){
//     let rowstorage =[];
//     for(let j  = 0; j<row; j++){
//         let obj = {
//             bold : false,
//             italic : false,
//             underline : false,
//             alignment : "",
//             font_color : "#000000",
//             bgcolor : "#000000",
//             fontsize : "14",
//             fontfamily : "monospace",
//             value : "",
//             formula : "",
//             children : [],
//             visited : false,
//             rvisited : false,
//         }
//         rowstorage.push(obj);
//     }
//     cellstorage.push(rowstorage);

// }



let bold = document.querySelector(".bold");
let underlined = document.querySelector(".underlined");
let italic = document.querySelector(".italic");
let alignment = document.querySelectorAll(".alignment");
let leftalign = alignment[0];
let centeralign = alignment[1];
let rightalign = alignment[2];
let fontcolor = document.querySelector(".fontcolor >input");
let bgcolor = document.querySelector(".bgcolor > input");
let fontfamily = document.querySelector(".font-family-prop");
let fontsize = document.querySelector(".font-size-prop");
let formulabar = document.querySelector(".formula-bar > input");

let sheetfoldcont = document.querySelector(".sheet-folder-cont");
let sheetadd = document.querySelector(".sheet-add");
sheetadd.addEventListener("click", function(){
    let newsheet = document.createElement("div");
    newsheet.setAttribute("class", "sheet-cont");
    let sheetcont = document.querySelectorAll(".sheet-cont");
    newsheet.setAttribute("id", sheetcont.length);
   
    newsheet.innerText = "sheet" + Number(sheetcont.length + 1); 
    sheetfoldcont.appendChild(newsheet); 
    addsheet();
    handlesheet(newsheet);
    handlesheetremoval(newsheet);
   
})
function handlesheetremoval(newsheet){
    newsheet.addEventListener("mousedown", function(e){
        if(e.button !== 2){
            return;
        }
        let sheetcont = document.querySelectorAll(".sheet-cont");
        if(sheetcont.length === 1){
            alert("You need to have atleast 1 sheet");
        }
        let response = confirm("Do you want to remove sheet , it will be permanently deleted")
        if(!response){
         return;
        }
        let sheetidx = Number(newsheet.getAttribute("id"));
        sheetremoval(newsheet)
        sheetstorage.splice(sheetidx, 1);
        cellstorage = sheetstorage[0];
        handlecell();
        
    })
}
function sheetremoval(sheet){
        sheet.remove();
        let sheetcont = document.querySelectorAll(".sheet-cont");
        for(let i = 0; i<sheetcont.length; i++){
            sheetcont[i].setAttribute("id",`${i}`);
            sheetcont[i].innerText = "sheet" + Number(`${i+1}`); 
            sheetcont[i].style.backgroundColor = "black";
        }
sheetcont[0].style.backgroundColor = "red";
}
function handlesheet(newsheet){
    newsheet.addEventListener("click", function(){
        let sheetidx = Number(newsheet.getAttribute("id"));
        cellstorage = sheetstorage[sheetidx];
        let sheetcont = document.querySelectorAll(".sheet-cont");
        for(let i = 0; i<sheetstorage.length; i++){
                sheetcont[i].style.backgroundColor = "black";
        }
        sheetcont[sheetidx].style.backgroundColor = "red";
        handlecell();
    })
    newsheet.click();
  }
function handlecell(){
    for(let i = 0; i<col; i++){
        for(let j = 0; j<row; j++){
            let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
            cell.click();
        }
    }
    let defaultcall = document.querySelector(".cell");
    defaultcall.click();
}



function addsheet(){
    let cellstorag = [];
    
    for(let i = 0; i<col; i++){
        let rowstorage =[];
        for(let j  = 0; j<row; j++){
            let obj = {
                bold : false,
                italic : false,
                underline : false,
                alignment : "",
                font_color : "#000000",
                bgcolor : "#dff9fb",
                fontsize : "14",
                fontfamily : "monospace",
                value : "",
                formula : "",
                children : [],
                visited : false,
                rvisited : false,
            }
            rowstorage.push(obj);
        }
        cellstorag.push(rowstorage);
    
    }
    sheetstorage.push(cellstorag);
    }






function activecell(){
    let [rid, cid] = getaddress();
    let cell = document.querySelector(`.cell[rowid="${rid}"][colid="${cid}"]`);
    let cellprop = cellstorage[rid][cid];
    return [cell,cellprop];
  
  }
  
  function getaddress(){
      let address = document.querySelector(".address-bar>input").value;
      let i = Number(address.slice(1) - 1);
      let j = Number(address.charCodeAt(0) - 65);
      
      let celladdress = [i,j];
      return celladdress;
  }

for(let i = 0; i<col; i++){
    let newcol = document.createElement("div");
    newcol.innerText = i+1;
    newcol.setAttribute("class", "newcol");
    colcont.append(newcol);

}
let rowcont = document.querySelector(".row-cont");
for(let i = 0; i<row; i++){
    let newrow = document.createElement("div");
    newrow.innerText = String.fromCharCode(65+i);
    newrow.setAttribute("class", "newrow");
    rowcont.append(newrow);
}
let cellcont = document.querySelector(".cell-cont");



for(let i = 0; i<col ; i++){
    let ncol = document.createElement("div");
     ncol.setAttribute("class" , "ncol");
    cellcont.append(ncol);
    for(let j = 0; j<row; j++){
        let nrow = document.createElement("div");
        nrow.setAttribute("class", "cell");
        nrow.setAttribute("contentEditable","true");
        nrow.setAttribute("rowid" , i);
        nrow.setAttribute("colid", j);
        nrow.setAttribute("spellcheck", false);
        nrow.addEventListener("click" , function(){
        let x = document.querySelector(".address-bar > input");
        x.value = String.fromCharCode(65+j)+`${i+1}`;})
      
//         let [cell,cellprop] = activecell();
//         bold.style.backgroundColor = (cellprop.bold) ? ("red"):("black");
//         italic.style.backgroundColor = (cellprop.italic) ? ("red") : ("black");
//         underlined.style.backgroundColor = (cellprop.underline) ? ("red") : ("black");
//         fontsize.value = cellprop.fontsize;
//         fontfamily.value = cellprop.fontfamily;
//         fontcolor.value = cellprop.font_color;
//         fontcolor.value = cellprop.bgcolor;
//         formulabar.value = cellprop.formula;
//         if(cellprop.alignment === "left"){
//             alignment[0].style.backgroundColor = "red";
//             alignment[1].style.backgroundColor = "black";
//             alignment[2].style.backgroundColor = "black";

//         }
//         else if (cellprop.alignment === "right"){
//             alignment[0].style.backgroundColor = "black";
//             alignment[1].style.backgroundColor = "black";
//             alignment[2].style.backgroundColor = "red";
//         }
//         else if(cellprop.alignment === "center"){
//             alignment[0].style.backgroundColor = "black";
//             alignment[1].style.backgroundColor = "red";
//             alignment[2].style.backgroundColor = "black";

//         }
//         else {
//             alignment[0].style.backgroundColor = "black";
//             alignment[1].style.backgroundColor = "black";
//             alignment[2].style.backgroundColor = "black";
//         }
      
//         }
       
//         )
     
        
        ncol.appendChild(nrow);
    }
}


{   sheetadd.click();
    handlecell();  
    }

for(let i = 0; i<col ; i++){
    for(let j = 0; j<row; j++){
        let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
        cell.addEventListener("click" , function(){
         cellprop = cellstorage[i][j];   
         cell.innerText = cellprop.value;   
        bold.style.backgroundColor = (cellprop.bold) ? ("red"):("black");
        italic.style.backgroundColor = (cellprop.italic) ? ("red") : ("black");
        underlined.style.backgroundColor = (cellprop.underline) ? ("red") : ("black");
        fontsize.value = cellprop.fontsize;
        fontfamily.value = cellprop.fontfamily;
        fontcolor.value = cellprop.font_color;
        fontcolor.value = cellprop.bgcolor;
        formulabar.value = cellprop.formula;

        cell.style.fontWeight = (cellprop.bold)?("bold"):("normal");
        cell.style.fontFamily = cellprop.fontfamily;
        cell.style.fontSize = cellprop.fontSize;
        cell.style.fontColor = cellprop.fontcolor;
        cell.style.textDecoration = (cellprop.underline)?("underline"):("none");
        cell.style.backgroundColor = cellprop.bgcolor;
        cell.style.textAlign = cellprop.alignment;
        if(cellprop.alignment === "left"){
            alignment[0].style.backgroundColor = "red";
            alignment[1].style.backgroundColor = "black";
            alignment[2].style.backgroundColor = "black";

        }
        else if (cellprop.alignment === "right"){
            alignment[0].style.backgroundColor = "black";
            alignment[1].style.backgroundColor = "black";
            alignment[2].style.backgroundColor = "red";
        }
        else if(cellprop.alignment === "center"){
            alignment[0].style.backgroundColor = "black";
            alignment[1].style.backgroundColor = "red";
            alignment[2].style.backgroundColor = "black";

        }
        else {
            alignment[0].style.backgroundColor = "black";
            alignment[1].style.backgroundColor = "black";
            alignment[2].style.backgroundColor = "black";
        }
      
        }
       
        )
     
        
       
    }
}

let flag = false;
let eye = document.querySelector(".eye >img");
eye.addEventListener("click",function(){
    flag = !flag;
    if(flag){
        eye.setAttribute("src", "./tg_eye2.png");
        eye.setAttribute("class", "ghoul");
        document.querySelector("#game").style.display = "flex";
        document.querySelector(".grid-action").style.display = "none" ;
        document.querySelector(".music").play();
        document.querySelector("*").style.fontFamily = 'Press Start 2P';
    }
    else {
        eye.setAttribute("src", "./icons8-eye-24.png");
        eye.setAttribute("class", "normal");
        document.querySelector("#game").style.display = "none";
        document.querySelector(".music").pause();
        document.querySelector(".grid-action").style.display = "block" ;
    }
})


