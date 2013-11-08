import java.io.*;

/*=== Json desbrozer ===*/
/* 	Tiene un argumento de entrada, que tiene que ser el nombre del fichero.
/*	Para que funcione es necesario que las llaves de apertura y cierre estén en la posición 0 de la cadena, si las condiciones del Json varían, debe modificarse el código.
/*	Para obtener el ejecutable nuevo sin un IDE basta con lanzar en terminal 'javac JsonDesbrozer.java'
  ===				 ===*/
public class JsonDesbrozer{
	public static void main(String args[]){
		try{
	
		System.out.println(args[0]);
		  File fstream = new File(args[0]);
		  File fOstream = new File("out.txt");
		  
		  BufferedReader br = new BufferedReader(new FileReader(fstream));
		  PrintWriter pw = new PrintWriter(new FileWriter(fOstream));
		  
		  Boolean flag = false;
		  // Get the object of DataInputStream
		  String strLine;
		  //Read File Line By Line
		  while ((strLine = br.readLine()) != null)   {
		  // Print the content on the console
			  if(strLine.charAt(0)=='{'){
				  flag = true;
			  } 
			  if(flag){
				  pw.write(strLine+'\n');
			  }
			  
			  if( strLine.charAt(0) == '}' ){
				  flag = false;
			  }
		  }
		  //Close the input stream
		  br.close();
		  pw.close();
		  
		  if (!fstream.delete()) {
		      System.out.println("Could not delete file");
		      return;
		  } 
		  if (!fOstream.renameTo(fstream)){
		      System.out.println("Could not rename file");
		  } 
		  
	  }catch (Exception e){//Catch exception if any
		  System.err.println("Error: " + e.getMessage());
	  }
  }
}
