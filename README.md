# Examen-seconde-session

<p><strong>PRESENTATION DU PROJET</strong></p>
<p>Nous allons dans ce projet créer une Application de gestion des Locations dans une agence de Location de véhicules</p>
<p>Le système a réaliser devra proposer des fonctionnalités de gestion (Ajout d’un nouveau véhicules, ajout d’une nouvelle location et retour d’un véhicule de location)</p> <p>Outre les fonctionnalités de gestion l’application devra être capable de fournir aux utilisateurs des outils de consulting/reporting pour :</p>
        
 <ul>
            <li>Connaitre à tout moment la situation du parc automobile (quels sont les véhicules en cours de location et quels sont les véhicules disponible)</li>
            <li>Connaitre à tout moment l’historique des locations sur une période bien définie et également l’historique de chaque véhicule</li>
            <li>Connaitre également le rendement du parc sur une période et bien évidemment les auto qui génèrent le plus de revenues.</li>
            
  </ul><br>
 <p>De ce fait nous disposerons d’une base de données contenant les tables Clients, Location, Véhicules initialement vides et à remplir au moyen de formulaires, et une table Catégorie  préalablement remplie </p><br>
        
  <p>De plus, nous disposerons aussi des fichiers Js contenant des requêtes AJAX, des fichiers HTML et CSS. </p><br>
        
<h2><strong> BESOINS DU CLIENT</strong></h2>
 <p> Le client ici est par exemple le responsable de l’agence qui grâce à l’application devrait pouvoir enregistrer un nouveau véhicule acquis par l’agence, enregistrer une nouvelle location et accessoirement le client concerné par la location, il devra également être capable de valider le retour d’un véhicule de location. Ensuite il aura la possibilité grâce a un certain nombre de fonctionnalités de consulter des historique de locations par exemple, les revenues de l’agence sur des périodes bien  définies etc.</p>
        
  <h2><strong> 
FONCTIONNALITES PRINCIPALES
</strong></h2><ol>
            <li>Formulaire d’enregistrement de véhicules qui permettra de récupérer les informations concernant un véhicule nouvellement acquis par l’agence </li>
            <li>Formulaire d’enregistrement d’une nouvelle location qui récupéra les informations concernant la location (véhicules loué, date de retour etc…) et par la même occasion collectera les informations concernant le client  </li>
             <li>Des boutons répondant aux différentes  requêtes de consulting (Disponibilité des véhicules , historique des véhicules et rendement de l’agence)   </li>
        </ol>
        
  <h2><strong> 
FONCTIONNALITES PRINCIPALES
</strong></h2>
        
 <p>Afin de mener à bien notre projet il sera indispensable pour nous de définir les éléments qui constitueront le BACKEND et le FRONTEND</p>
        
 <ol>
            <li>	BACKEND : Une base de données qui permettra les contenir les différentes informations sur les véhicules acquis par l’agence, les locations effectuées et les différents clients. Ainsi nous aurons donc comme tables :
                <ul><li><strong>Catégorie</strong> avec pour attributs : IdCategorie de type chaines de caractères qui représente la clé primaire, NomCategorie également de type chaine de caractères. Cette table sera au préalable remplie
                    
  </li>
  <li><strong>Véhicules </strong>ayant pour attribut : Matricule, la clé primaire, de type chaine de caractère qui représente la plaque d’immatriculation du véhicule, Marque également de type chaine de caractère, Prix Location de type integer, Disponible de type booléen, IdCategorie également de type chaine de caractère qui joue le rôle de clé étrangère et finalement DateArrivée de type Date qui représente la date d’arrivée du véhicule dans le parc automobile
                    
  </li>
                    
  <li><strong>	Clients </strong>ayant pour attributs : NumeroNational de type chaines de caractères qui joue le rôle de clé primaire, NomClient également de type chaines de caractères, PrenomClients également de type chaines de caractères, DateDeNaissance de type DATE, NumeroGsm de type chaines de caractères et Adresse de type chaines de caractères 
                    
  </li>
   <li><strong>	Location </strong>ayant pour attributs : IdLocation de type chaines de caractères qui va jouer le rôle de clé primaire de la table, DateLocation de type Date, DateRetour de type DATE, Matricule de type chaines de caractères qui joue de clé étrangère, NumeroNational également de type chaines de caractères qui est également clé étrangère a la table 
                    
  </li>
                </ul>
            </li>
             <li>BACKEND : Un serveur web capable de fournir les pages html, js, css, ainsi que de proposer des web services
            </li>
            
 <li>BACKEND : des Web services
                  
  <ul>
                      <li>	Les web services<strong>Page, Js, Css</strong>  tous de type RAW ayant respectivement les procédures Http_getPage, Http_getJs, http_getCss en paramètres qui permettront au serveur de pouvoir fournir les différents fichiers HTML, JS et CSS</li>
                      
 <li>	Le web service<strong>InsererVehicule</strong>  de type HTML associé à la procédure NouveauVehicule qui permettra de stocker les différentes informations concernant les véhicules rentrées via le formulaire dans la base de données</li>
                      
  <li>	Le web service<strong>Dispo</strong> de type JSON associé à la procédure SelectionVehicule qui récupère tous les matricules et les marque des véhicules du appartenant à l’agence des patients </li>
                      
  <li>	Le web service<strong>SelectionVeh </strong> de type JSON associé à la procédure SelectionVehicule qui récupère tous les matricules et les marque des véhicules du appartenant à l’agence des patients  </li>
                      
   <li>	Le web service<strong>EmpruntVehicule </strong> de type HTML associé à la procédure Emprunt qui permettra de stocker les différentes informations concernant la location d’un véhicule par la même occasion les informations sur le client rentrées via le formulaire dans la base de données  </li>
                      
   <li>	Le web service<strong>Histo </strong> de type JSON associé à la procédure HistoriqueParVéhicule qui permet de consulter l’historique des locations pour chaque véhicule sur une période .</li>
      </ul>
    </li>
  <li>
                FRONTEND: des pages web (html, js, css) permettant d'appeler les web services et de traiter les réponses, qui propose une interface utilisateur pour:
                
  <ol>
                <li>Enregistrer les nouveaux véhicules
                    </li>
                     <li>	Enregistrer les Locations
                    </li>
                    <li>	Afficher les résultats des différentes requêtes de consulting
                    </li>
                </ol>
            </li>
        </ol>
        
        
        
        
   ![Capture22](https://user-images.githubusercontent.com/64273779/89740399-92b58b00-da88-11ea-842e-5f018a1afa15.JPG)

        
       
        
        
        
        
        


