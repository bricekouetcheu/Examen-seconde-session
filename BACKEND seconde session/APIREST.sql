--------------ajout un nouveau vehicule----------------------------------

Create PROCEDURE NouveauVehicule (in ID char(20) , in name char(40), in Prix int,in cat char(20) , DateA Date)
    result (Matr char(10) , Nom char(50) , color char(50), cat char(20))
 BEGIN 
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
   call sa_set_http_header( 'Content-Type', 'text/html' );

         IF (select  count(*)    
                  from Vehicule
                 WHERE Matricule=ID)<1 
            THEN   insert into Vehicule values
            (ID,name,color,1,0,getdate(),cat);
                 ELSE 
                     call sa_set_http_header( 'Content-Type', 'text/html' );
                     SELECT '<p>'+'patient deja rentre'+'</p>'
            ENDIF 
 END

CREATE SERVICE "InsererVehicule" TYPE 'HTML' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call NouveauVehicule(:ID ,:name,:Prix , :cat , :DateA);





---------Nouveille Location-----------------------------------


CREATE PROCEDURE Emprunt(in NumeroNat char(20), in nom char(40) , in prenom char(40),in DateNaissance DATE,in GSM char(15),in addre char(50),in DateLoca DATE , in DateRe DATE, in IdVehicule char(20))
     BEGIN 
    CALL sa_set_http_header('Access-Control-Allow-Origin', '*');
     call sa_set_http_header( 'Content-Type', 'text/html' );

    IF (select  count(*)    
                  from Clients
                 WHERE NumeroNational=NumeroNat)<1 
        THEN        
          insert into Clients values 
        (NumeroNat,nom,prenom,DateNaissance,GSM,addre);

  insert into Location values
        (
(SELECT 'LOC'||' '|| ceil(rand()*10000000000)) ,DateLoca,DateRe,IdVehicule,NumeroNat);
      

        Update Vehicule
        set disponible=0
        where Matricule=IdVehicule

        ELSE 
    insert into Location values
        
((SELECT 'LOC'||' '|| ceil(rand()*10000000000)) ,DateLoca,DateRe,IdVehicule,NumeroNat);
          Update Vehicule
       set disponible=0
        where Matricule=IdVehicule


       ENDIF
    END
    
    
    CREATE SERVICE "EnpruntVehicule" TYPE 'HTML' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call Emprunt(:NumeroNat,:nom,:prenom,:DateNaissance,:GSM,:addre,:DateLoca,:DateRe,:IdVehicule);
    
    
     ------------RetourLocation--------------------
 
Create PROCEDURE RetourVehicule( in matri char(15) )
 
 BEGIN 
    Call sa_set_http_header('Access-Control-Allow-Origin', '*');
   call sa_set_http_header( 'Content-Type', 'text/html' );
    UPDATE Vehicule
    SET disponible=1
    WHERE Matricule=matri
    
 END
 
  CREATE SERVICE "Retour" TYPE 'HTML' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call RetourVehicule( :matri  )
 

    
    
    
    
    
    -----------procedure_de construction dynamique des selecthtml-------------------------------
    
CREATE PROCEDURE SelectionVehicule()
    result ( matricule char(20), Nom char(20))
  BEGIN 
        CALL sa_set_http_header('Access-Control-Allow-Origin', '*');
     call sa_set_http_header( 'Content-Type', 'text/html' );
    SELECT DBA.Vehicule.Marque , DBA.Vehicule.Marque
    FROM Vehicule
    WHERE disponible=1
 END
 
 CREATE SERVICE "SelectionVeh" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call SelectionVehicule()
 
 
 
 
 ---------Disponibilité des vehicules---------------------
 
 	create PROCEDURE Disponibilité(in dispo int , in cat char(15))

result (Matricule char(30) , Nom char(40))

BEGIN 

 CALL sa_set_http_header('Access-Control-Allow-Origin', '*');

select Matricule, DBA.Vehicule.Marque

FROM Vehicule NATURAL JOIN Categorie

WHERE disponible=dispo AND Categorie.IdCategorie=Categorie

end

CREATE SERVICE "Dispo" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call Disponibilité(:dispo , :cat )



---------Historiques des Locations-----------------------------

CREATE PROCEDURE Historique(in DateDeb date , in DateF date)
    result(marque char(20),categorie char(30),date_de_location date , date_retour date, client char(50),telephone char(20))
    begin
      call sa_set_http_header('Access-Control-Allow-Origin', '*');
    
    select  V.Marque , C.NomCategorie , L.DateLocation , L.DateRetour , CL.NomClient, CL.NumeroGsm
     from Categorie as C Natural join Vehicule as V natural join Location as L natural join Clients as CL   
    where L.DateLocation >= DateDeb and L.DateLocation<=DateF

    end

CREATE SERVICE "Histo" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call Historique(:DateDeb,:DateF)




-------------Historique par Vehicules-------------------------

CREATE PROCEDURE HistoriqueParVehicule(in matri char(20))
    result(Numero_de_location char(30),date_de_location date ,date_de_retour date , NomClient date,telephone char(20))
    begin
      call sa_set_http_header('Access-Control-Allow-Origin', '*');
    
    select L.IdLocation, L.DateLocation , L.DateRetour , CL.NomClient, CL.NumeroGsm
     from Categorie as C Natural join Vehicule as V natural join Location as L natural join Clients as CL   
    where V.Matricule=matri 
    ORDER BY L.dateLocation DESC 

    end
    
    CREATE SERVICE "HistoVeh" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call HistoriqueParVehicule(:matri )
    
    
    
----------Vehicules les plus demandés--------------------

CREATE PROCEDURE NombreLocation (in DateDebut date , in DateFin date)

    result (Marque char(50),categorieVehicule char(30),NombreLocation int)
 
        begin
     CALL sa_set_http_header('Access-Control-Allow-Origin', '*');

        SELECT  DBA.Vehicule.Marque , NomCategorie as categorie,count(DBA.Location.IdLocation)  as nombreLocation 

        FROM Location NATURAL JOIN Vehicule NATURAL JOIN Categorie

            WHERE dateLocation >=DateDebut AND dateLocation <=DateFin


            GROUP BY Marque,NomCategorie

            ORDER BY nombreLocation DESC 

    end
    
 CREATE SERVICE "NombreLoc" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call NombreLocation (: DateDebut  , : DateFin)
 
 -------------Revenues par categorie----------------------------------
 
CREATE PROCEDURE RendementTotalParCartegorie (in DateDebut date , in DateFin date)

    result (categorieVehicule char(50) ,RendementTotal INTEGER )
 
        begin
     CALL sa_set_http_header('Access-Control-Allow-Origin', '*');
        select NomCategorie ,sum(datediff(day,DBA.Location.dateLocation,DBA.Location.DateRetour)*DBA.Vehicule.PrixLocation)as Rendement
        FROM Location NATURAL JOIN Vehicule NATURAL JOIN Categorie

         WHERE dateLocation >=DateDebut AND dateLocation <=DateFin
         GROUP BY NomCategorie 
         ORDER BY  Rendement DESC 
        

    end


 CREATE SERVICE "RendeCategorie" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call RendementTotalParCartegorie(:DateDebut ,:DateFin)
 
 
 ---------------Revenues par Vehicules-------------------------
 
 Create PROCEDURE MeilleurRendement (in DateDebut date , in DateFin date)

    result (categorieVehicule char(50) ,RendementTotal INTEGER )
 
        begin
     CALL sa_set_http_header('Access-Control-Allow-Origin', '*');
        select Marque,sum(datediff(day,DBA.Location.dateLocation,DBA.Location.DateRetour)*DBA.Vehicule.PrixLocation)as Rendement
        FROM Location NATURAL JOIN Vehicule NATURAL JOIN Categorie

         WHERE dateLocation >=DateDebut AND dateLocation <=DateFin
         GROUP BY Marque 
         ORDER BY  Rendement DESC 
        

    end
    
    
     CREATE SERVICE "MeilleurVeh" TYPE 'JSON' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call RendementTotalParCartegorie(:DateDebut ,:DateFin)
 

