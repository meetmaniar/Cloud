package model;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.mllib.fpm.AssociationRules;
import org.apache.spark.mllib.fpm.FPGrowth;
import org.apache.spark.mllib.fpm.FPGrowthModel;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


import scala.Tuple2;

	public class main {
		

	public static void main(String[] args) throws IOException {
		// TODO Auto-generated method stub
		
	

		
		SparkConf conf = new SparkConf();
		
		conf.setMaster("local").setAppName("word count");
		JavaSparkContext jsc = new JavaSparkContext(conf);
		
		
		JavaRDD<String> file = jsc.textFile(args[0]);
		JavaRDD<List<String>> transaction = file.map(line -> Arrays.asList(line.split(" ")));
		
		FPGrowth fpg = new FPGrowth().setMinSupport(0.02).setNumPartitions(1);
		FPGrowthModel<String> model = fpg.run(transaction);
		
		for (FPGrowth.FreqItemset<String> itemset: model.freqItemsets().toJavaRDD().collect()) {
			  System.out.println("[" + itemset.javaItems() + "], " + itemset.freq());
			}
		double minConfidence = 0.02;
		for (AssociationRules.Rule<String> rule
		  : model.generateAssociationRules(minConfidence).toJavaRDD().collect()) {
		  System.out.println(
		    rule.javaAntecedent() + " => " + rule.javaConsequent() + ", " + rule.confidence());
		}
		
		
	}


	
	

}
