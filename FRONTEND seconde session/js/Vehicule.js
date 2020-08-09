function getID (id){
   document.getElementById(id);
}
  let form = document.getElementById("formulaireVehicule");
let select=document.getElementById('IdCategorie');


// requete AJAX d'ajout d'un nouveau vehicule

function InsererVehicule (identite,nom,prixL,categorie,dateAdmission){
    let xhr= new XMLHttpRequest();
    xhr.open('get',"http://localhost:300/InsererVehicule?ID="+identite+"&name="+nom+"&prix="+prixL+"&cat="+categorie+"&dateA="+dateAdmission,'true');
    xhr.onload=function () {
        alert('nouveau vehicule ajouté');
        console.log(xhr.responseText);
    }
    
    xhr.send();
}


document.addEventListener('DOMContentLoaded',InitPage);

function InitPage(){
    document.getElementById('formulaireVehicule').addEventListener('submit',enregistrerVehicule); 
}

function enregistrerVehicule(e){
    e.preventDefault();
    
    let form = document.getElementById("formulaireVehicule");
    
 soumettre(form.matricule.value);        

}


function soumettre(identite)
{
    let xhr= new XMLHttpRequest();
    xhr.open('get',"http://localhost:300/RecupId",true);
    xhr.onload= function traiter(){
        
        console.log(xhr.responseText);
        
        let reponse = JSON.parse(xhr.responseText);
        
        let form = document.getElementById("formulaireVehicule");

        
        tester(reponse);
        
 InsererVehicule(form.matricule.value, form.marque.value,form.Prixloc.value,select.value, form.Date.value);
        
            function tester(obj)
        {
            
             let form = document.getElementById("formulaireVehicule");
    
            for(let i in obj)
            {
                if(form.matricule.value == obj[i].identifiant)
                {
                    alert('IMPOSSIBLE!!! ce matricule existe deja');
                    return
                }
            }
            
           
          
        }

   

    
    }
    
    xhr.send();
}