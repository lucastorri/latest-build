_slugify_strip_re = /[^\w\s-]/g;
_slugify_hyphenate_re = /[-\s]+/g;
function slugify(s) {

	var from = 'àáäãâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to   = 'aaaaaeeeeiiiioooouuuunc------';

	for (var i=0, l=from.length ; i<l ; i++) {
    s = s.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  s = s.replace(_slugify_strip_re, '').trim().toLowerCase();
  s = s.replace(_slugify_hyphenate_re, '-');

  return s;
}

module.exports = {
  slugify: slugify
}
