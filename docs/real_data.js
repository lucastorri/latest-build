var model = require('./lib/model')('http://latest-build.no.de/');
var Talk = model.Talk;
var Conference = model.Conference;

var talk = function(title, desc, tags, start, end, authors) {
  var t = new Talk();
  t.title = title;
  t.description = desc
  t.tags = tags;
  t.start = start;
  t.end = end;
  t.authors = authors;
  return t;
}

var conf = function(title, desc, venue, talks) {
  var c = new Conference();
  c.title = title;
  c.owner = 'lucastorri'
  c.description = desc;
  c.venue = venue;
  c.talks = talks;
  c.save();
}

conf(
  'Reaktor Dev Day', 
  "In the event Finnish software professionals have the opportunity to code together with the world's leading software developers. The speakers include Scala programming language developer Martin Odersky and Akka developer Jonas Bonér.",
  'Pikku Satamankatu 3, 00160 Helsinki, Finland +358 9 173341',
  [
    talk(
      'Scaling Up and Out with Scala and Akka',
      "Today's world of parallel and distributed computing poses hard new challenges for software development. A rapidly increasing number of developers now have to deal with races, deadlocks, non-determinism, and we are ill-equipped to do so. How can we keep things simple, in spite of the complexity of the underlying runtimes?",
      ['scala', 'akka', 'scaling'],
      new Date(2011, 8, 2, 9, 15, 0, 0),
      new Date(2011, 8, 2, 10, 15, 0, 0),
      ['Martin Odersky', 'Jonas Bonér']
    ),
    talk(
      'Real-time web architectures',
      "Real-time web brings some awesome opportunities, but there’s lots of complexity in the implementation side. Which client-side technologies are mature enough? How much server resources does it consume when tens of thousands of users are connected to the server at the same time?",
      ['real-time', 'web'],
      new Date(2011, 8, 2, 10, 15, 0, 0),
      new Date(2011, 8, 2, 11, 15, 0, 0),
      ['Otto Hilska']
    ),
    talk(
      'Cross-platform mobile development with JavaScript',
      "This session explores PhoneGap, an open source platform that lets developers create native mobile applications in JavaScript, HTML and CSS – the web's very own lingua franca.",
      ['javascript', 'mobile', 'cross-platform'],
      new Date(2011, 8, 2, 11, 15, 0, 0),
      new Date(2011, 8, 2, 12, 15, 0, 0),
      ['Lasse Koskela']
    ),
    talk(
      'Distributed "Web-scale" systems, the Spotify way',
      "",
      ['distributed', 'web', 'scaling'],
      new Date(2011, 8, 2, 14, 15, 0, 0),
      new Date(2011, 8, 2, 15, 15, 0, 0),
      ['Ricardo Vice Santos']
    ),
    talk(
      'A Tale of Three Trees',
      "",
      ['github', 'case'],
      new Date(2011, 8, 2, 15, 15, 0, 0),
      new Date(2011, 8, 2, 16, 15, 0, 0),
      ['Scott Chacon']
    ),
    talk(
      'Pitfalls and lessons learned with Node.js (in finnish)',
      "",
      ['nodejs', 'javascript'],
      new Date(2011, 8, 2, 15, 15, 0, 0),
      new Date(2011, 8, 2, 16, 15, 0, 0),
      ['Juho Mäkinen,']
    ),
    talk(
      'The Business of Open Source',
      "",
      ['biz', 'oss'],
      new Date(2011, 8, 2, 16, 15, 0, 0),
      new Date(2011, 8, 2, 17, 0, 0, 0),
      ['Scott Chacon']
    )
  ]
)

conf(
  'Node Knockout feedback',
  "48h later, we are still (almost) alive. Time to talk about it :D",
  'Wherever you are',
  [
    talk(
      "Let's talk about the Node Knockout :D",
      "",
      ['nodejs', 'nodeko'],
      new Date(2011, 7, 29, 3, 00, 0, 0),
      new Date(2011, 7, 29, 20, 00, 0, 0),
      ['The Latest Build Team']
    )
  ]
)