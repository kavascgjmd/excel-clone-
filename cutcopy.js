let ctrlkey ;
document.addEventListener("keydown",function(e){
    ctrlkey = e.ctrlKey;

})
document.addEventListener("keyup", function(e){
    ctrlkey = e.ctrlKey;
})

for(let i  = 0; i<col; i++){
    for(let j = 0; j<row; j++){
        let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
        handleSelectedCell(cell);
    }
}

let copybtn = document.querySelector(".copy");
let cutbtn = document.querySelector(".cut");
let pastebtn = document.querySelector(".paste");
let rangeStorage = [];
function handleSelectedCell(cell){
    cell.addEventListener("click", function(){
        if(! ctrlkey) return;
         if(rangeStorage.length >= 2){
            handleSelectedCellsUI();
            rangeStorage = [];
         }
        cell.style.border = "3px solid red";
        let rid = Number(cell.getAttribute("rowid"));
        let cid = Number(cell.getAttribute("colid"));
        rangeStorage.push({rid,cid});
    })
}

function handleSelectedCellsUI(){
    for(let i = 0; i<rangeStorage.length; i++){
      
        let cell = document.querySelector(`.cell[rowid="${rangeStorage[i].rid}"][colid="${rangeStorage[i].cid}"]`);
        
        cell.style.border = "1px solid rgba(255, 0, 0, .3)";
       

    }
}

let copyData = [];
copybtn.addEventListener("click",function(){
    copyData = [];
    for(let i = Number(rangeStorage[0].rid); i<=Number(rangeStorage[1].rid); i++){
        let cellRow  =  [];
        for(let j = Number(rangeStorage[0].cid); j<= Number(rangeStorage[1].cid); j++){
            cellRow.push(cellstorage[i][j]);
        }
        copyData.push(cellRow);
    }
    handleSelectedCellsUI();
   
})

cutbtn.addEventListener("click",function(){
     copybtn.click();
     backtonormalcut();

  
    

})

function backtonormalcut(){
    for(let i1 = Number(rangeStorage[0].rid); i1<=Number(rangeStorage[1].rid); i1++){
        for(let j1 = Number(rangeStorage[0].cid); j1<= Number(rangeStorage[1].cid); j1++){
            let cell = document.querySelector(`.cell[rowid="${i1}"][colid="${j1}"]`);
            cellstorage[i1][j1].bold = false;
            cellstorage[i1][j1].italic = false;
            cellstorage[i1][j1].underline = false;
            cellstorage[i1][j1].alignment = "";
            cellstorage[i1][j1].font_color = "#000000";
            cellstorage[i1][j1].bgcolor = "#dff9fb";
            cellstorage[i1][j1].fontsize = "14";
            cellstorage[i1][j1].fontfamily = "monospace";
            cellstorage[i1][j1].value = "";
            cell.click();
        }
    }
}

pastebtn.addEventListener("click",function(){
   if(rangeStorage.length < 2){
    return;
   }
   let [i,j] = getaddress();
   let rdiff = rangeStorage[1].rid - rangeStorage[0].rid;
   let cdiff = rangeStorage[1].cid - rangeStorage[0].cid;
   for(let i1 = i; i1 <= i+rdiff; i1++){
    for(let j1 = j; j1<= j+cdiff ; j1++){
    let cell = document.querySelector(`.cell[rowid="${i1}"][colid="${j1}"]`);

        
        if(!cell){
            
            continue;
        }
     
        let data = copyData[i1-i][j1-j];
         cellstorage[i1][j1].bold = data.bold;
         cellstorage[i1][j1].italic = data.italic;
         cellstorage[i1][j1].underline = data.underline;
         cellstorage[i1][j1].alignment = data.alignment;
         cellstorage[i1][j1].font_color = data.font_color;
         cellstorage[i1][j1].bgcolor = data.bgcolor;
         cellstorage[i1][j1].fontsize = data.fontsize;
         cellstorage[i1][j1].fontfamily = data.fontfamily;
         cellstorage[i1][j1].value =data.value;
        
       cell.click();
        
        
        
       
    }
   }

})