
CREATE TABLE Categorie (
    IdCategorie char(20) not NULL ,
    NomCategorie char(30),
CONSTRAINT pk_Categories PRIMARY KEY (IdCategorie)
)


CREATE TABLE Clients (
    NumeroNational char(20) not null,
    NomClient char(40),
    PrenomClient char(40),
    DateDeNaissance Date,
    NumeroGSM char(15),
    Addresse char(50),
CONSTRAINT pk_Client primary KEY (NumeroNational)
)

CREATE TABLE Vehicule (
    Matricule char(20) not null,
    Marque char(40),
    Couleur char(15),
    disponible BIT not NULL DEFAULT 1,
    NombreLocation INTEGER ,
    IdCategorie char(20) not NULL ,
    DateArrivée Date,
CONSTRAINT pk_Vehicule PRIMARY KEY (Matricule),
CONSTRAINT fk_Vehicule FOREIGN KEY ( IdCategorie) REFERENCES Categorie(IdCategorie)
)

CREATE TABLE Location(
    IdLocation char(10),
    dateLocation DATE ,
    DateRetour DATE,
    Matricule char(20) not null,
    NumeroNational char(20) not null,
CONSTRAINT pk_Location PRIMARY KEY (IdLocation),
CONSTRAINT fk1_Location FOREIGN KEY (Matricule) REFERENCES Vehicule(Matricule),
CONSTRAINT fk2_Location FOREIGN key (NumeroNational) REFERENCES Clients (NumeroNational)
)

INSERT into Categorie VALUES 
('cat01','SUV'),
('cat02','sport'),
('cat03','utilitaire'),
('cat04','berline'),
('cat05','citadine')