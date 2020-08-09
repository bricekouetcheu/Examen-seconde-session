let selection = document.getElementById("IdchoixVehicule");
let form = document.getElementById("formLocation");


document.addEventListener('DOMContentLoaded',InitPage);

function InitPage(){
    let xhr = new XMLHttpRequest();
    xhr.open('get' , 'http://localhost:300/SelectionVeh','true');
    xhr.onload=function (){
        console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        CreerSelection(reponse,"IdchoixVehicule");
        
        
        function CreerSelection(obj,id){
            
            for(let i in obj){
                let opt= document.createElement("option");
                opt.value=obj[i].matricule;
                opt.textContent=obj[i].Nom;
                document.getElementById(id).appendChild(opt);
            }
            
        }
    }
    
    xhr.send();
}


function EnvoyerInformation(id,name,surname,DateNai,NumeroGSM,localisation,DateE,DateRe,Vehicule){
    
    let xhr=new XMLHttpRequest();
    
    xhr.open('get','http://localhost:300/EmpruntVehicule?NumeroNat='+id+'&nom='+name+'&prenom='+surname+'&DateNaissance='+DateNai+'&GSM='+NumeroGSM+'&addre='+localisation+'&DateLoca='+DateE+'&DateRe='+DateRe+'&IdVehicule='+Vehicule,true);
    
    xhr.onload=function(){
        console.log(xhr.responseText);
        alert('Nouvelle Location!!');
    }
    
    xhr.send();
    
}

document.getElementById("formLocation").addEventListener("submit",EnvoiFormulaire);

function EnvoiFormulaire(e){
    e.preventDefault();
    
   let form = document.getElementById("formLocation");
    EnvoyerInformation(form.identifiant.value,form.Nom.value,form.Prenom.value,form.DateN.value,form.Gsm.value,form.AddresseClient.value,form.DateL.value,form.DateR.value,selection.value);
    
      
}

//requete AJAX de retour de vehicule
function GererRetour(vehicule){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:300/Retour?matri='+vehicule,true);
    xhr.onload=function(){
        console.log(xhr.responseText);
        alert("operation reussie");
    }
    xhr.send();
}

let valeur = document.getElementById("ReturnId");

// retour vehicule
document.getElementById("IdButtonRetour").addEventListener('click' , RetournerVehicule);

function RetournerVehicule(){
    
     let xhr = new XMLHttpRequest();
    xhr.open('get' , 'http://localhost:300/SelectionVeh','true');
    xhr.onload=function (){
        let reponse = JSON.parse(xhr.responseText);
        
        tester(reponse);
        GererRetour(valeur.value);
        
        function tester(obj){
             for(let i in obj){
                if(valeur==obj[i].matricule){
                    alert('ce vehicule a deja été retourné');
                }
            }
        }
        
           
        
        
        
    }
    
    xhr.send();
    
    
}