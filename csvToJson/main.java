package csvToJson;

import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;
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
		

	FileInputStream inputStream = new FileInputStream(file);
	InputStreamReader ip = new InputStreamReader(inputStream,"UTF-8");
	BufferedReader bf = new BufferedReader(ip);
	
	
	JSONObject obj=new JSONObject();
	
	try {
		
		int i=0;
		PrintWriter outputfile= new PrintWriter(args[1]);
		
		while(inputStream.read()!=-1) {
			
			String data=bf.readLine();
			String[] values = data.split(",");
			
			JSONArray item = new JSONArray();
			
			for(int j=0;j<values.length;j++) {
			
			item.add(values[j]);
			}
			obj.put("items", item);
			i++;
			obj.put("tid", i);
		outputfile.println(obj.toJSONString());	
		}
		outputfile.close();
		outputfile.flush();
		bf.close();
		ip.close();
		inputStream.close();
	}
	
	
		catch (FileNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	
	
}

}
