


document.addEventListener('DOMContentLoaded',InitPage);

/*
*
*requete AJAX d'ajout dynamique des vehicules disponibles
*/

function InitPage(){
    let xhr = new XMLHttpRequest();
    xhr.open('get' , 'http://localhost:300/Total','true');
    xhr.onload=function (){
        console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
     
        
        CreerSelection(reponse,"IdchoixVehicule");
        
        /**
        * Ajoute dans la balise select tous les vehicules Disponibles
        @param {object} obj qui contient contenant tous les vehicule disponibles
        @param{string} IDchoixVehicule qui est l'id de la balise select dans laquelle on injectera les donnéés
        @return{string} opt chaine de caractes composée des differents options de la balise select
        */
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



//fonctionnalité 1



document.getElementById("FormConsultation").addEventListener('submit', afficherVehicule);

function  afficherVehicule(e){
    
    e.preventDefault();
    
    let recupCategorie= document.getElementById("IdCategorie");
    let form =  document.getElementById("FormConsultation");
    envoyerDemande1( form.disponibilité.value,recupCategorie.value);
}

function envoyerDemande1(etat,categorie){
    let xhr = new XMLHttpRequest();
    xhr.open('get', "http://localhost:300/Dispo?situation="+etat+"&cat="+categorie , true);
    xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message1").innerHTML='<p id="idmessage1"> pas de resultat </p>';
        }
        
        else{
           
            traiterResultat( reponse);
            
        }
        
       /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} tableau qui est converti en html
       
       */
        
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message1").innerHTML=tableau;

            
        }
        
    }
    
    xhr.send();
}

//fonctionnalité 2 

document.getElementById('buttonF2').addEventListener('click',VoirHistorique);

function VoirHistorique(){
    let Debut=document.getElementById('dateD2');
     let Fin =document.getElementById('dateF2');
   EnvoyerDemande2(Debut.value,Fin.value) ;
    
}

//requete AJAX
function EnvoyerDemande2(Entrée,sortie){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:300/Histo?DateDeb='+Entrée+"&DateF="+sortie,true);
   
        
 xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message2").innerHTML='<p id="idmessage2"> pas de Location au cours de cette periode </p>';
        }
        
        else{

    traiterResultat( reponse);
}
            
        }
       
             /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} qui est converti en html
       
       */
        
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message2").innerHTML=tableau;

            
        }
      xhr.send();
  
    }
    
    

//fonctionnalité3

document.getElementById("buttonF3").addEventListener('click' , HistoriqueParVehicule);

function HistoriqueParVehicule(){
    
    let histo=document.getElementById("IdchoixVehicule");
    EnvoyerDemande3(histo.value);
}

function EnvoyerDemande3(identifiant){
    
 let xhr = new XMLHttpRequest();
        xhr.open('get','http://localhost:300/HistoVeh?matri='+identifiant,true);       
        xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message3").innerHTML='<p id="idmessage3"> pas de Location au cours de cette periode!! </p>';
        }
        
        else{
             
            traiterResultat( reponse);
        }
       
        
             /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} qui est converti en html
       
       */
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message3").innerHTML=tableau;

            
        }
        
    }
    
    xhr.send();
}

//fonctionnalité 4

document.getElementById("buttonF4").addEventListener('click',NombreLocation);

function NombreLocation(){
    let Debut=document.getElementById('dateD4');
     let Fin =document.getElementById('dateF4');
   EnvoyerDemande4(Debut.value,Fin.value) ;
    
}

//requete AJAX
function EnvoyerDemande4(Entrée,sortie){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:300/NombreLoc?DateDebut='+Entrée+"&DateFin="+sortie,true);
   
        
 xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message4").innerHTML='<p id="idmessage4"> pas de Location au cours de cette periode </p>';
        }
        
        else{
             
            traiterResultat( reponse);
        }
       
        
             /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} qui est converti en html
       
       */
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message4").innerHTML=tableau;

            
        }
        
    }
    
    xhr.send();
}

//fonctionnalite5


document.getElementById("buttonF5").addEventListener('click',RendementParCartegorie);

function RendementParCartegorie(){
    let Debut=document.getElementById('dateD5');
     let Fin =document.getElementById('dateF5');
   EnvoyerDemande5(Debut.value,Fin.value) ;
    
}

//requete AJAX
function EnvoyerDemande5(Entrée,sortie){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:300/RendeCategorie?DateDebut='+Entrée+"&DateFin="+sortie,true);
   
        
 xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message5").innerHTML='<p id="idmessage5"> Pas de revenus au cours de cette periode </p>';
        }
        
        else{
                 /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} qui est le tableau a afficher a l'ecran
       
       */
        
             
            traiterResultat( reponse);
        }
       
        
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+" "+"euros"+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message5").innerHTML=tableau;

            
        }
        
    }
    
    xhr.send();
}


//fonctionnalité 6


document.getElementById("buttonF6").addEventListener('click',RendementParVehicule);

function RendementParVehicule(){
    let Debut=document.getElementById('dateD6');
     let Fin =document.getElementById('dateF6');
   EnvoyerDemande6(Debut.value,Fin.value) ;
    
}

//requete AJAX
function EnvoyerDemande6(Entrée,sortie){
    let xhr = new XMLHttpRequest();
    xhr.open('get','http://localhost:300/MeilleurVeh?DateDebut='+Entrée+"&DateFin="+sortie,true);
   
        
 xhr.onload=function (){
        
         console.log(xhr.responseText);
        let reponse =JSON.parse(xhr.responseText);
        
        if( reponse.length==0){
             document.getElementById("message6").innerHTML='<p id="idmessage6"> Pas de revenus au cours de cette periode </p>';
        }
        
        else{
            
            traiterResultat( reponse);
            
        }
       
             /**
       *Ajouter le resulat de la requete ajax dans la page
       *
       *
       @param{object} obj qui contient le resultat de la requete
       @return {string} qui est converti en html
       
       */
        
        
        function  traiterResultat(obj){
            
                let tableau = "<table><thead><tr>";
            let attributs = Object.keys(obj[0]);
            for(let i in attributs){
                tableau+="<th>"+attributs[i]+"</th>";
                
                }
                tableau+='</tr></thead><tbody>';
            for(let i in obj){
                tableau+="<tr>";
                for(let j in obj[i]){
                    tableau+="<td>"+obj[i][j]+" "+"euros"+"</td>";
                }
                tableau+="</tr>";
            }
            tableau+="</tbody></table>";
            document.getElementById("message6").innerHTML=tableau;

            
        }
        
    }
    
    xhr.send();
}



