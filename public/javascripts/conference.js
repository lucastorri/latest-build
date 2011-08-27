var conferencePage = function(){
	var bind = function(){
		enableAddDay();
	};
	
	var enableAddDay = function(){
		$('#new_day').click(function(e){
			e.preventDefault();
			$.ajax({
				url: '/conference/day/new',
				success: function(res){
					alert(res);
				}
			})
		});
	};
	
	bind();
};

$(document).ready(function(){
	conferencePage();
});