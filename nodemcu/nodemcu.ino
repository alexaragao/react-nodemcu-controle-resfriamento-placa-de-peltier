#include <ESP8266WiFi.h>
#include <WiFiServer.h>

#define pinRele D0
#define pinLM35 A0

WiFiServer servidor(8080);
WiFiClient cliente;

float temperatura;
float tMin = 15;
float tMax = 20;

boolean rele = true;
const char* ssid = "wifissid";
const char* password = "wifipassword";

void setup() {
  Serial.begin(9600);
 
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
   
  Serial.println(WiFi.localIP());
  servidor.begin();
 
  pinMode(pinRele, OUTPUT);
  pinMode(pinLM35, INPUT);
}
 
void loop() {
  http();
  readLM35Temperature();
  delay(50);

  if (temperatura > tMax) {
    digitalWrite(pinRele, HIGH);
    rele = true;
  } else if (temperatura < tMin) {
    digitalWrite(pinRele, LOW);
    rele = false;
  }
}

void readLM35Temperature() {
  float analogValue = analogRead(pinLM35);
  float millivolts = (analogValue/1024.0) * 3300;
  temperatura = millivolts  /10;
  Serial.println(temperatura);
}

String message;
 
void http() {
  cliente = servidor.available();
  if (cliente == true) {
    String req = cliente.readStringUntil('\r');
    String res;
    if (req.indexOf("/turnOn") > -1) {
      digitalWrite(pinRele, HIGH);
      rele = true;
    }

    if (req.indexOf("/turnOff") > -1) {
      digitalWrite(pinRele, LOW);
      rele = false;
    }

    if (req.indexOf("/setLimits") > -1) {
      tMin = req.substring(req.indexOf("=") + 1, req.indexOf("&") ).toFloat();
      tMax = req.substring(req.indexOf("&") + 5, req.length() - 9 ).toFloat();
    }

    if (req.indexOf("/getTemperature") > -1) {
      res = sendHtmlResponse(String(temperatura));
    }
    
    Serial.println(message);
    cliente.print(res);
    delay(100);
  }
}

String sendHtmlResponse(String dado) {
  String htmlPage =
     String("HTTP/1.1 200 OK\r\n") +
      "Content-Type: application/json\r\n" +
      "Connection: close\r\n" +
      "Refresh: 1\r\n"
      "\r\n" +
      "{ \"temperatura\" : \" " + dado + "\" }";
  return htmlPage;
}
