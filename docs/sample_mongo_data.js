var model = require('./lib/model')('http://latest-build.no.de/');

var Talk = model.Talk;
var Conference = model.Conference;

var tdc1 = new Talk();
tdc1.title = 'JDK 7: Modificações na linguagem';
tdc1.description = 'Nessa palestra serão apresentadas as modificações mais importantes da linguagem Java nessa nova versão, tais como: gerenciamento automático de recursos, multi-catch, inferência de tipos genéricos, entre outros. Cada tópico será discutido e exemplificado através de programas.';
tdc1.tags = ['jdk7'];
tdc1.start = new Date(2011, 8, 1, 10, 30, 0, 0);
tdc1.end = new Date(2011, 8, 1, 11, 30, 0, 0);
tdc1.authors = ['Eder Magalhães'];

var tdc2 = new Talk();
tdc2.title = 'Arquiteturas JEE no Google AppEngine';
tdc2.description = 'O Google AppEngine suporta as especificações de JSP e Servlets definidos no JEE, e somando-se a isso, suporta uma grande quantidade de frameworks web.';
tdc2.tags = ['javaee', 'arquitetura', 'google', 'gae'];
tdc2.start = new Date(2011, 8, 1, 10, 45, 0, 0);
tdc2.end = new Date(2011, 8, 1, 11, 10, 0, 0);
tdc2.authors = ['Rafael Pereira Nunes', 'Eder Magalhães'];

var tdc3 = new Talk();
tdc3.title = 'AS 7 - Like a JBoss';
tdc3.description = 'Boss AS 7 veio para revolucionar o conceito de Servidores JEE com velocidade, praticidade e muita simplicidade.';
tdc3.tags = ['java', 'as', 'jboss'];
tdc3.start = new Date(2011, 8, 1, 11, 30, 0, 0);
tdc3.end = new Date(2011, 8, 1, 12, 20, 0, 0);
tdc3.authors = ['Hanneli Carolina Andreazzi Tavante'];

var tdc = new Conference();
tdc.title = 'TDC Floripa 2011';
tdc.owner = 'lucastorri'
tdc.description = 'The Developer Conference. Roborica, Java, Web, Mobile, Agile e muito mais';
tdc.venue = 'Universidade Estácio de Sá';
tdc.talks = [tdc1, tdc2, tdc3];

tdc.save();


Conference.find({slug:'tdc-floripa-2011'}, function (err, docs) {
  docs.forEach(function(d) {
    console.log(d);
  });
});

Conference.find({'talks.slug':'as-7-like-a-jboss'}, function (err, docs) {
  docs && docs.forEach(function(d) {
    console.log(d.title);
  });
});