for(let i = 0; i<col ; i++){
    for(let j = 0; j<row ; j++){
        let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);

        cell.addEventListener("blur", function(){
            let [acell, cellprop] = activecell();
            if(cellprop.value === acell.innerText){
                return;
            }
            cellprop.value = acell.innerText;  
            removechildrenfromparent(cellprop.formula);
            cellprop.formula = "";
            for(let k = 0; k<cellprop.children.length; k++)
            {
             let childaddress = cellprop.children[k];
             let rid = Number(childaddress.slice(1) - 1);
             let cid = Number(childaddress.charCodeAt(0) - 65);
             let childcell = document.querySelector(`.cell[rowid="${rid}"][colid="${cid}"]`);
             let childcellprop = cellstorage[rid][cid];
             let value = getvalue(childcellprop.formula);
             
            
             childcellprop.value = value;
             childcell.innerText = value;
             updatechildren(childaddress, rid, cid);
            }
        })
    }
}

let again = [];
formulabar.addEventListener("keydown",function(e){
    if(e.key === "Enter" && formulabar.value){
        
        let address = document.querySelector(".address-bar>input").value;
        let i = Number(address.slice(1) - 1);
        let j = Number(address.charCodeAt(0) - 65);
      
      
       let [cell, cellprop] = activecell();
    
    if(formulabar.value !== cellprop.formula){
     
       removechildrenfromparent(cellprop.formula);
       addchildrentoparent(formulabar.value);
     }
     again = [];
     if(checkcycle(i , j )){
        alert("cylce is formed");
        for(let i = 0; i<again.length; i++){
            cellstorage[again[i].i][again[i].j].visited = false;
        }
        return ;
    }
    for(let k = 0; k<again.length; k++){
   
        cellstorage[again[k].i][again[k].j].visited = false;
    }
    
    let value = getvalue(formulabar.value);
       cellprop.value = value;
       cell.innerText = value;
       cellprop.formula = formulabar.value;
      
       updatechildren(address, i , j );
    }
})


function updatechildren(address , i , j ){
    let parentcellprop = cellstorage[i][j];
    for(let k = 0; k<parentcellprop.children.length; k++)
    {
     let childaddress = parentcellprop.children[k];
     let rid = Number(address.slice(1) - 1);
     let cid = Number(address.charCodeAt(0) - 65);
     let childcell = document.querySelector(`.cell[rowid="${rid}"][colid="${cid}"]`);
     let childcellprop = cellstorage[rid][cid];
     let value = getvalue(childcellprop.formula);
     
    
     childcellprop.value = value;
     childcell.innerText = value;
     updatechildren(childaddress, rid, cid);
    }
}

function removechildrenfromparent(s){
    let i = 0;
    while(i<s.length){
       if(checkchar(s[i])){
        
          let i1 = Number(s.charCodeAt(i) - 65);
          let fj1 = "";
          let j1;
          i++;
          while (checknum(s[i])){
         fj1 += s[i];
         i++;
          }
          i--;
          j1 = Number(fj1 - 1);
          let address = document.querySelector(".address-bar>input").value;
          let x = cellstorage[j1][i1].children.length;
          for(let k = 0; k<x ; k++){
            if(cellstorage[j1][i1].children[k] === address){
                cellstorage[j1][i1].children.splice(k , 1);
            }
          }
          
       }
       else {
    }
       i++;
    }
}

function addchildrentoparent(s){
    let address = document.querySelector(".address-bar>input").value;
    let i = 0;
while(i<s.length){
   if(checkchar(s[i])){
    
      let i1 = Number(s.charCodeAt(i) - 65);
      let fj1 = "";
      let j1;
      i++;
      while (checknum(s[i])){
     fj1 += s[i];
     i++;
      }
      i--;
      j1 = Number(fj1 - 1);
      
      
      cellstorage[j1][i1].children.push(address);
      
   }
 
   i++;
}
}

function getvalue(s){
    let stc = "";
    let i = 0;
while(i<s.length){
   if(checkchar(s[i])){
      let i1 = Number(s.charCodeAt(i) - 65);
      let fj1 = "";
      let j1;
      i++;
      while (checknum(s[i])){
     fj1 += s[i];
     i++;
      }
      i--;
      j1 = Number(fj1 - 1);
      
      stc +=  cellstorage[j1][i1].value;
   }
   else {
   stc += s[i];}
   i++;
 }


 return eval(stc);
}

function checkchar(x){
  if(x.charCodeAt(0) <= 90 && x.charCodeAt(0) >= 65 ){
    return true;
  }
  return false;
}

function checknum(x){
    if(x.charCodeAt(0) <= 57  && x.charCodeAt(0) >= 48){
        return true;
    }
    return false;
}


function checkcycle( i , j){

    cellprop = cellstorage[i][j];
    again.push({i,j});
   
    cellprop.visited = true;
    cellprop.rvisited = true;
    let child = cellprop.children;
    for(let i = 0; i<child.length; i++){
        let childaddress = child[i];
        let rid = Number(childaddress.slice(1) - 1);
        let cid = Number(childaddress.charCodeAt(0) - 65);
        let childcellprop = cellstorage[rid][cid];
        if(!childcellprop.visited){
         return checkcycle( rid, cid);  
        }
        else if(childcellprop.rvisited){
            return true;
        }
    }

    cellprop.rvisited = false;
    return false;
}