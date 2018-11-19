package model;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.Set;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.mllib.fpm.AssociationRules;
import org.apache.spark.mllib.fpm.FPGrowth;
import org.apache.spark.mllib.fpm.FPGrowthModel;
import org.json.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;
import org.json.simple.parser.JSONParser;
import  java.io.Serializable;

import model.data;


import scala.Tuple2;

	public class main {
		

	@SuppressWarnings("unchecked")
	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
		SparkConf conf = new SparkConf();
		
		conf.setMaster("local").setAppName("word count");
		JavaSparkContext jsc = new JavaSparkContext(conf);
	
		
		
		JavaRDD<String> file = jsc.textFile("C:\\Users\\NIDHI\\New_dataset.csv");
		JavaRDD<List<String>> transaction = file.map(line -> Arrays.asList(line.split(",")));
		
		FPGrowth fpg = new FPGrowth().setMinSupport(0.01).setNumPartitions(1);
		FPGrowthModel<String> model = fpg.run(transaction);
		
		for (FPGrowth.FreqItemset<String> itemset: model.freqItemsets().toJavaRDD().collect()) {
			  System.out.println(itemset.javaItems() + "," + itemset.freq());
			}
		
		List<data> items =new ArrayList<data>();

		double minConfidence = 0.2;
		for (AssociationRules.Rule<String> rule
		  : model.generateAssociationRules(minConfidence).toJavaRDD().collect()) {
			
		 //System.out.println(rule.javaAntecedent() + " ====> " + rule.javaConsequent() + ", " + rule.confidence()*100);
		 data dataobj = new data(rule.javaAntecedent(),rule.javaConsequent(),rule.confidence()*100);
		  
		  items.add(dataobj);
		}
		
		Scanner reader = new Scanner(System.in);
		//recommender
		/*System.out.print("Enter the item you want to search :");
		String input = reader.nextLine();*/
		JSONArray array = new JSONArray();
		JSONArray value = new JSONArray();
		JSONArray key = new JSONArray();
		JSONObject obj  = new JSONObject();
		
		PrintWriter outputfile = new PrintWriter("C:\\Users\\NIDHI\\dataset121.json");
		
		System.out.println("Our output is here");
		for(data dataobj : items){
			
			//System.out.println(dataobj.getAntecedent() + "====>" +dataobj.getConsequent()+"====>" + dataobj.getConfidence());
			//value.add(dataobj.getConsequent());
			// Storing one key and multi values(by using list)using HashMap
			
			Map<List<String>,List<String>> map = new HashMap<List<String>,List<String>>();
			//List<String> valset =  new ArrayList<String>();
			//valset.add(dataobj.getConsequent());
//			Set<String> set = new HashSet<String>(dataobj.getAntecedent());
//			set.addAll(dataobj.getAntecedent());
//			dataobj.getAntecedent().clear();
//			dataobj.getAntecedent().addAll(set);
			map.put(dataobj.getAntecedent(), dataobj.getConsequent());
			
			System.out.println("Fetching keys and values");
			for (Map.Entry<List<String>, List<String>> entry : map.entrySet()) {
	            List<String> key1 = entry.getKey();
	            List<String> values = entry.getValue();
	            System.out.println(key1 + "====>" + values);
	            //System.out.println("Values = " + values + "n");
			}
			key.add(dataobj.getAntecedent());
			value.add(dataobj.getConsequent());
			obj.put(dataobj.getAntecedent(), dataobj.getConsequent());
			
			
			/*if(dataobj.getAntecedent().contains(input)) {
				System.out.println(dataobj.getAntecedent() +"===>"+dataobj.getConsequent() + "===>" + dataobj.getConfidence());
				//value.add(dataobj.getConsequent());
				//obj.put(dataobj.getAntecedent(), value);
				
				
		}
			
			else {
				//System.out.println(input + " has no enough support or is not in the list.");
				//break;
			}*/
			
		}
		//System.out.println(array.toJSONString());
		array.add(obj);
		outputfile.print(array.toJSONString());	
		outputfile.close();
		outputfile.flush();
	}
	
}
