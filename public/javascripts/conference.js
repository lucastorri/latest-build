var conferencePage = function(){
	var bind = function(){
		$('#new_day').click(function(e){
			e.preventDefault();
			$.ajax({
				url : '/conference/day/new',
				success: function(response){
					alert('oi')
				}
			})
		})
	};
	bind();
};

$(document).ready(function(){
	var page = conferencePage();
});