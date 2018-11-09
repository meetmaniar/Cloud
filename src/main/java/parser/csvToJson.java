package parser;

import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class csvToJson {
	public static String path;
	
	public csvToJson(String path) {
		this.path = path;
	}
	
	public void csvToJson() {
		File file = new File(path);
		

		try {
			Scanner sc = new Scanner(file);
			
			int i=0;
			PrintWriter outputfile= new PrintWriter("C:\\Users\\meetr\\Downloads\\Apriori-R\\Apriori\\dataset.json");
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
