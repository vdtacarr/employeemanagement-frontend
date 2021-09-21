class Request{

 async get(url){
    
        const response = await fetch(url);
        const data = await response.json();
        return data;
 
}

async post(url,data){
      const response = await fetch(url,{
          method:"POST",
          "body":JSON.stringify(data),
          headers:{
              "Content-type":"application/json; charset=UTF-8"
 
          }
         

      } );
      const vat = await response.json();
      return vat;
}
  async delete(url){
      const response = await fetch(url,{
          method:"DELETE"
      });
      return "Veri Silme İşlemi Başarılı";
  }
}


const table = document.getElementById("table");
const nm = document.getElementById("fname1");
const email = document.getElementById("fname2");
const submit = document.getElementById("form1");

table.addEventListener("click",run)

function run(e){
   
    if(e.target.className === "glyphicon glyphicon-remove"){
       e.target.parentElement.parentElement.remove();
       const id = e.target.parentElement.parentElement.firstChild.textContent;
       request.delete("http://localhost:8080/demo/"+id);
    }
    
}
submit.addEventListener("click",function doSubmit(e){
    if(nm.value !== "" || email.value !== ""){
        
        
    
        const go={
            "name":nm.value,
            "email":email.value
        }
        
        
        const post = request.post("http://localhost:8080/demo/add",go);
        window.location.replace("http://127.0.0.1:5501/");
        
        
        
    }
    else{
        alert("Bos kişi girişi");
    }
});

const request = new Request();
const index = request.get( "http://localhost:8080/demo/all")
.then(org => {
for(let i =0;i<org.length;i++){
    var node = document.createElement("tr");               
    node.innerHTML = "<td></td><td></td><td></td><td class='table-success' style='text-align:center;' ><i class='fas fa-cloud' ></i></td><td class='table-light'> <i class='glyphicon glyphicon-remove' ></i></td>"
    table.children[1].appendChild(node);
}
let index=0;
org.forEach(element => {
    table.children[1].children[index].children[0].textContent = element.id;
    table.children[1].children[index].children[1].textContent = element.name.toUpperCase();
    table.children[1].children[index].children[2].textContent = element.email;
    index++;
});
}
)









