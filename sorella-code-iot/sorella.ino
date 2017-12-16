#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
WiFiClient client;

const char* ssid = "Lintang";
const char* password = "lintang2611";

void setup() {
  Serial.begin(115200);
  pinMode(D5, INPUT);
  pinMode(D6, OUTPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Wi-Fi connected");
}

void loop() {
  int lat = -6.2247829;
  int lng = 106.8271008;
  if(digitalRead(D5)==1){digitalWrite(D6, HIGH); uploadData(lat,lng);}
  else{digitalWrite(D6, LOW);}
}

void uploadData(int lat, int lng){
  if(WiFi.status()== WL_CONNECTED){
    Serial.println("Masuk");
    
    HTTPClient http;
    
    http.begin("http://us-central1-hackathon-9ad8e.cloudfunctions.net/buttonHelp");
    http.addHeader("Content-Type", "application/json");

    String body = "{\"button_id\": \"sorella123\", \"lat\": " + String(lat) + ", \"lng\": " + String(lng) + ", \"type\": \"help\"}";
    
    int httpCode = http.POST(body);
    //int httpCode = http.GET();
    String payload = http.getString(); 
    
    Serial.println(httpCode); 
    Serial.println(payload); 
    
    http.end();
  }else{
    Serial.println("Error in WiFi connection");   
  }
delay(3000);
}