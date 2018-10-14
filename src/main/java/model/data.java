package model;

import java.util.List;

public class data {
	public  List<String> Antecedent;
	public  List<String> Consequent;
	public  double Confidence;
	public data(List<String> Antecedent, List<String> Consequent, double Confidence) {
		// TODO Auto-generated constructor stub
		this.Antecedent = Antecedent;
		this.Consequent = Consequent;
		this.Confidence=Confidence;
	}
	public  List<String> getAntecedent() {
		return Antecedent;
	}
	public  void setAntecedent(List<String> antecedent) {
		Antecedent = antecedent;
	}
	public  List<String> getConsequent() {
		return Consequent;
	}
	public  void setConsequent(List<String> consequent) {
		Consequent = consequent;
	}
	public  double getConfidence() {
		return Confidence;
	}
	public  void setConfidence(double confidence) {
		Confidence = confidence;
	}
}
