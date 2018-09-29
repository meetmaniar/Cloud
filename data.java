package parser;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class data {
	public static ArrayList<String> items;
	public static int id;
	
	public data(int id,ArrayList<String> items) {
		this.id=id;
		this.items=items;
	}
	public static void main(String[] args) throws FileNotFoundException, IOException, ParseException {
		
		
		JSONParser parser=new JSONParser();
		File file = new File("C:\\Users\\meetr\\Downloads\\Apriori-R\\Apriori\\dataset.json");
		
		try {
			JSONArray array = (JSONArray) parser.parse(new FileReader(file));
			JSONObject[] obj = new JSONObject[array.size()];
			
			
			for(int i=0;i<array.size();i++) {
			obj[i]=(JSONObject) array.get(i);
			/*System.out.println(obj[i]);*/
		
			}
			data[] d = new data[obj.length];
			
			for(int i=0;i<obj.length;i++) {
				ArrayList<String> itm = new ArrayList<String>();
			
				d[i].setId(Integer.parseInt(obj[i].get("tid").toString()));
				
				String valuesInString=obj[i].get("items").toString();
				String[] values=valuesInString.split(",");
				for(int j=0;j<values.length;j++) {
				itm.add(values[j]);
				}
				d[i].setItems(itm);
				System.out.println(d[i].getId()+" ====> "+d[i].getItems());
				
				
			}
			
		}
		finally {
			
		}
		
	}
	public static ArrayList<String> getItems() {
		return items;
	}
	public static void setItems(ArrayList<String> items) {
		data.items = items;
	}
	public static int getId() {
		return id;
	}
	public static void setId(int id) {
		data.id = id;
	}

}
