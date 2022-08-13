//storage 



bold.addEventListener("click",function(){
   let [cell, cellprop] = activecell()
   cellprop.bold = !cellprop.bold;
   cell.style.fontWeight = (cellprop.bold) ? ("bold") : ("normal");
   bold.style.backgroundColor = (cellprop.bold) ? ("red"):("black");
})

italic.addEventListener("click" , function(){
    let [cell, cellprop] = activecell();
    cellprop.italic = !cellprop.italic;
    cell.style.fontStyle = (cellprop.italic) ? ("italic") : ("normal");
    italic.style.backgroundColor = (cellprop.italic) ? ("red") : ("black");
})

underlined.addEventListener("click" , function(){
    let [cell, cellprop] = activecell();
    cellprop.underline = !cellprop.underline;
    cell.style.textDecoration = (cellprop.underline) ? ("underline") : ("none");
    underlined.style.backgroundColor = (cellprop.underline) ? ("red") : ("black");
})

fontsize.addEventListener("change",function(){
    let [cell, cellprop] = activecell();
    cellprop.fontsize = fontsize.value;
    cell.style.fontSize = cellprop.fontsize+"px";
    fontsize.value = cellprop.fontsize;
})

fontfamily.addEventListener("click", function(){
    let [cell, cellprop] = activecell();
    cellprop.fontfamily = fontfamily.value;
    cell.style.fontFamily = cellprop.fontfamily+"";
    fontfamily.value = cellprop.fontfamily;
})

fontcolor.addEventListener("change",function(){
    let [cell, cellprop] = activecell();
    cellprop.font_color = fontcolor.value;
    cell.style.color = cellprop.font_color;
    fontcolor.value = cellprop.font_color;
})

bgcolor.addEventListener("change",function(){
    let [cell, cellprop] = activecell();
    cellprop.bgcolor = bgcolor.value;
    cell.style.backgroundColor = cellprop.bgcolor;
    bgcolor.value = cellprop.bgcolor;
})

for(let i = 0; i<alignment.length; i++){
    alignment[i].addEventListener("click", function(){
       let [cell, cellprop] =  activecell();
     if(i === 0){
       cellprop.alignment = "left";
       cell.style.textAlign = cellprop.alignment;
       alignment[0].style.backgroundColor = "red";
       alignment[1].style.backgroundColor = "black";
       alignment[2].style.backgroundColor = "black";
     }
     else if (i === 1){
        cellprop.alignment = "center";
       cell.style.textAlign = cellprop.alignment;
       alignment[0].style.backgroundColor = "black";
       alignment[1].style.backgroundColor = "red";
       alignment[2].style.backgroundColor = "black";

     }
     else {
        cellprop.alignment = "right";
       cell.style.textAlign = cellprop.alignment;
       alignment[0].style.backgroundColor = "black";
       alignment[1].style.backgroundColor = "black";
       alignment[2].style.backgroundColor = "red";
     }
    })
}



