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

var rsrails1 = new Talk();
rsrails1.title = 'Causos de alguém na linha de frente, no más';
rsrails1.description = 'Escalar um site para 300^H^H^H 500^H^H^H 600 milhões de pageviews por mês gera um bocado de histórias.';
rsrails1.tags = ['escalabilidade', 'story'];
rsrails1.start = new Date(2011, 8, 3, 11, 30, 0, 0);
rsrails1.end = new Date(2011, 8, 3, 12, 20, 0, 0);
rsrails1.authors = ['Bruno Zanchet'];

var rsrails2 = new Talk();
rsrails2.title = 'Ruby no Noite Hoje';
rsrails2.description = 'Nesta palestra mostraremos como podemos utilizar o micro-framework Sinatra para aplicações web mais complexas, detalhando os pontos positivos e negativos de desta escolha, quando comparado com o Rails. Além disso, apresentaremos também a arquitetura do sistema e quais técnicas utilizamos para modelar a aplicação. Vamos também analisar os detalhes técnicos que envolvem diversas tecnologias utilizadas neste projeto, como por exemplo, MongoDB, Heroku e CoffeeScript.';
rsrails2.tags = ['noite', 'story'];
rsrails2.start = new Date(2011, 8, 3, 13, 30, 0, 0);
rsrails2.end = new Date(2011, 8, 3, 14, 20, 0, 0);
rsrails2.authors = ['Felipe Lima'];

var rsrails = new Conference();
rsrails.title = 'RS on Rails 2011 - Super Cold Edition';
rsrails.owner = 'nettofarah';
rsrails.description = 'O maior evento de Ruby do sul'
rsrails.venue = 'FACIN, PUC/RS - Porto Alegre'
rsrails.talks = [rsrails1, rsrails2]

rsrails.save();


var agilevale1 = new Talk();
agilevale1.title = 'Key Note: Pressão sem Opressão';
agilevale1.description = 'O sistema é opressor, implacável e imperdoável com os desfavorecidos. A atmosfera profissional o reprime, mas ainda assim você tem o desejo ardente em transformá-la. Talvez você seja um desenvolvedor "frustrado", talvez você seja um líder que precisa obter um efetivo engajamento de seus colaboradores.';
agilevale1.tags = ['experiência'];
agilevale1.start = new Date(2011, 8, 5, 9, 30, 0, 0);
agilevale1.end = new Date(2011, 8, 5, 10, 20, 0, 0);
agilevale1.authors = ['Samuel Crescêncio'];

var agilevale = new Conference();
agilevale.title = 'Agile Vale 2011';
agilevale.owner = 'gtramontina';
agilevale.description = 'O Agile Vale é o primeiro evento do Vale do Paraíba exclusivamente focado em metodologias ágeis e engenharia de software. Em sua segunda edição, o evento será realizado nos dias 19 e 20 de Agosto de 2011, no berço de grandes nomes quando se pensa em software e inovação tecnológica no Brasil e no Mundo, o ITA – Instituto Tecnológico de Aeronáutica.'
agilevale.venue = 'Campina Grande'
agilevale.talks = [agilevale1]

agilevale.save();


/*
Conference.find({'slug':'tdc-floripa-2011'}, function (err, docs) {
>>>>>>> 8594f2b00fa3a78119a7545bbbeb38e3a1e1ff54
  docs.forEach(function(d) {
    console.log(d);
  });
});

Conference.find({'slug':'tdc-floripa-2011', 'talks.slug':'as-7-like-a-jboss'}, function (err, docs) {
  docs && docs.forEach(function(d) {
    console.log(d.title);
  });
});
*/
