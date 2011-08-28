var slugifyStripRegEx = /[^\w\s-]/g;
var slugifyHyphenateRegEx = /[-\s]+/g;
var from = 'àáäãâèéëêìíïîòóöôùúüûñç·/_,:;';
var to   = 'aaaaaeeeeiiiioooouuuunc------';

module.exports = function(s) {
	for (var i=0, l=from.length ; i<l ; i++) {
    s = s.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  s = s.replace(slugifyStripRegEx, '').trim().toLowerCase();
  s = s.replace(slugifyHyphenateRegEx, '-');

  return s;
};
