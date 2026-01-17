let title = document.getElementById('title');
let price = document.getElementById('price');
let texas = document.getElementById('texas');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total= document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let mood='create';
let temp;



function gettotal()
{
 if(price.value!=''){
    let result = (+price.value+ +texas.value + +ads.value) - +discount.value
    total.innerHTML=result;
    total.style.background='green'
 } else {
    total.innerHTML='';
     total.style.background='rgba(165, 42, 42, 0.823)';
 }
}

let datapro = [];
if(localStorage.product!=null)
{
    datapro= JSON.parse(localStorage.product)
}
 else {
    datapro = [] ;
}


create.onclick = function()
{

    let newpro = {
title:title.value,
ads:ads.value,
discount:discount.value,
price:price.value,
texas:texas.value,
count:count.value,
category:category.value,
total:total.innerHTML,
    }
    if(title.value!=''
        &&price.value!=''
        &&category.value!=''
        && newpro.count < 500)
        { 
    if(mood==='create'){ 
    if(newpro.count>1){
for(let i = 0 ; i<newpro.count;i++) {

    datapro.push(newpro)
}

    } else{
 datapro.push(newpro)

    }
    }else{
        datapro[  temp   ]=newpro
        mood='create';
        create.innerHTML='create'
        count.style.display='block'

    }
    cleardata()
}
localStorage.setItem('product',JSON.stringify(datapro))
showdata()

}
function cleardata()
    {
title.value='',
ads.value='',
price.value='',
discount.value='',
texas.value='',
category.value='',
count.value='',
total.innerHTML=''
    }
    
     function showdata()
        {
         let table='';
  
         
         for(let i=0;i<datapro.length;i++)  {
   table+= `
<tr>
      <td>${i+1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
     <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].category}</td>
      <td onclick=updatedata(${i}) id="update"><button>update</button></td>
      <td onclick ="deletedata(${i})" id="delete"><button>delete</button></td>
</tr>

         
         `



         }
            
document.getElementById('tbody').innerHTML=table;
   let deleteall=document.getElementById('deleteall');
if(datapro.length>0)
{
   deleteall.innerHTML=`
   <button onclick="deleteal()" > delete all(${datapro.length})</button>
   ` 
} else{
deleteall.innerHTML=''
   

}
gettotal()

        }

showdata()

function deletedata(i){
datapro.splice(i,1)
localStorage.product=JSON.stringify(datapro)
showdata()
}
function deleteal()
{
datapro.splice(0)
    localStorage.clear
    showdata()
}
function updatedata(i)
{
title .value = datapro[i].title
price .value = datapro[i].price
texas .value = datapro[i].texas
ads .value = datapro[i].ads
discount .value = datapro[i].discount
category .value = datapro[i].category
gettotal()
count.style.display='none'
create.innerHTML='update'
temp=i;
mood='updatedata'
scroll({
    top:0,
    behavior:'smooth'
})
}