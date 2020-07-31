//fonction 

CREATE FUNCTION "DBA"."getpath" ()
returns LONG VARCHAR 
deterministic
 BEGIN 
    declare dbPath long varchar;
    declare dbname LONG VARCHAR ;
   set dbPath = (select db_property ('file'));
   set dbName = (select db_property('name')) + '.db'; -- nom de la db
   set dbPath = left(dbPath, length(dbPath)-length(dbName));

    return dbPath; // renvoyer path
END


//cette procedures renvoit le fichier html
	
                             
                             

CREATE PROCEDURE "DBA"."http_getpage"( in url CHAR(255) )

    result (html long VARCHAR )
    BEGIN 
        call sa_set_http_header('content-type','text/html');
        SELECT  xp_read_file(getPath()+ url + '.html') ;
    END
	
	
	CREATE PROCEDURE "DBA"."http_getJS"( in url char(255) )
    RESULT( js LONG  VARCHAR  ) 
   BEGIN
	 call sa_set_http_header('content-type','text/javascript');
        SELECT  xp_read_file(getPath()+'js/' +url);
    END
	
                             
                             
   //renvoi le fichier CSS                          
                             
CREATE PROCEDURE "DBA"."http_getCSS"(in url char(255))
    RESULT( css LONG  VARCHAR  ) 
BEGIN
	 call sa_set_http_header('content-type','text/css');
        SELECT  xp_read_file(getPath()+ 'css/'+ url) ;
END
	
    
                             
CREATE PROCEDURE "DBA"."http_getJS"(in url char(255))
    RESULT( css LONG  VARCHAR  ) 
BEGIN
	 call sa_set_http_header('content-type','text/javascript');
        SELECT  xp_read_file(getPath()+ 'js/'+ url) ;
END

	
CREATE SERVICE "css" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getCSS(:url);	


CREATE SERVICE "page" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getPage(:url);

CREATE SERVICE "js" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getJS(:url);
	
CREATE SERVICE "ROOT" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getJS(:url);	
	

	
	
	











