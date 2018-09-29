package csvToJson;

import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class main {

	@SuppressWarnings("unchecked")
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		String path = args[0];
		File file = new File(path);
		

	Scanner sc = new Scanner(file);
	
	
	
	try {
		
		int i=0;
		PrintWriter outputfile= new PrintWriter(args[1]);
		JSONArray transaction = new JSONArray();
		while(sc.hasNextLine()) {
			JSONObject obj=new JSONObject();
			String data=sc.nextLine();
			String[] values = data.split(",");
			
			JSONArray item = new JSONArray();
			
			for(String s : values) {
				item.add(s);
			}
			
			i++;
			obj.put("tid", i);
			obj.put("items", item);
			transaction.add(obj);
			
			
		}
		
		outputfile.print(transaction.toJSONString());	
		outputfile.close();
		outputfile.flush();
		sc.close();
	}
	
	
		catch (FileNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	
	
}

}
