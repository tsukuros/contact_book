var CBOOK = CBOOK || [
{
	full_name: 'Vlada Boiko',
	email: 'vladaboiko@gmail.com',
	phone: '0937402119',
	group: 'family'
},
{
	full_name: 'Sergey Vlasenko',
	email: 'sergeyvlasenko@gmail.com',
	phone: '0934956010',
	group: 'family'
},
{
	full_name: 'Alex Marusik',
	email: 'alexmarusik@gmail.com',
	phone: '0957733119',
	group: 'work'
},
{
	full_name: 'Dmytriy Melnichenko',
	email: 'dmytriymelnichenko@gmail.com',
	phone: '0939872497',
	group: 'school'
},
{
	full_name: 'Jimmy Hill',
	email: 'jimmyhill@gmail.com',
	phone: '0631245447',
	group: 'english'
},
{
	full_name: 'Many Trueman',
	email: 'manytrueman@gmail.com',
	phone: '0671471234',
	group: 'english'
},
]

var CGROUPS = CGROUPS || ['family', 'work', 'school', 'english']

jQuery(function($){
	var name,
			email,
			phone,
			group,
			new_name,
			new_email,
			new_phone,
			new_group,
			edit_btn = $('#edit'),
			index,
			$container = $('#content'),
			$form = $('form'),
			contacts = $('.name_item');

	function getNames(list){
		var i = 0;
		var list_of_names = '<div id="names-list">';
		while(i < list.length){
			list_of_names += '<div id="'+ convertToSlug(list[i].full_name) +'" class="name_item" data-email="' + list[i].email + '" data-phone="' + list[i].phone + '" data-group="' + list[i].group + '">' + list[i].full_name + '<span data-toggle="tooltip" data-placement="top" title="Edit Contact" class="glyphicon glyphicon-pencil edit"></span><span data-toggle="tooltip" data-placement="top" title="Remove Contact" class="glyphicon glyphicon-remove x-sign"></span></div>' 
			i++;
		}
		list_of_names += '</div>';
		$('#names-list').replaceWith(list_of_names);
	}

	function getGroups(list){
		var g = 0;
		var list_of_groups = '<ul id="group-list" class="dropdown-menu"><li class="group-item">All Contacts<span class="glyphicon glyphicon-ok-circle ok"></span></li>';
		while(g < list.length){
			list_of_groups += '<li class="divider"></li><li class="group-item">'+list[g]+'</li>'
			g++;
		}
		list_of_groups += '</ul>';
		$('#group-list').replaceWith(list_of_groups);
	}

	function getIndexByName(name){
		var n = 0;
		while(n < CBOOK.length){
			if(CBOOK[n].full_name == name){
				return n;
			}
			n++;
		}
	}

	function resetForm(){
		$form.find('input').val('');
		$form.find('select').val('');
	}

	function convertToSlug(Text){
    return Text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  }

  $.fn.selectRange = function(start, end) {
	    if(!end) end = start; 
	    return this.each(function() {
	        if (this.setSelectionRange) {
	            this.focus();
	            this.setSelectionRange(start, end);
	        } else if (this.createTextRange) {
	            var range = this.createTextRange();
	            range.collapse(true);
	            range.moveEnd('character', end);
	            range.moveStart('character', start);
	            range.select();
	        }
	    });
	};

	getNames(CBOOK);
	getGroups(CGROUPS);
	// show selected contact
	$(document).on('click', '.name_item', function(){
		$form.addClass('hidden');
		edit_btn.removeClass('hidden');
		name = $(this).text();
		email = $(this).data('email');
		phone = $(this).data('phone');
		group = $(this).data('group');
		$container.find('#c-detail').replaceWith('<div id="c-detail"><p><span class="glyphicon glyphicon-user"></span> Full Name: ' + name + '</p><p><span class="glyphicon glyphicon-envelope"></span> Email: ' + email + '</p><p><span class="glyphicon glyphicon-phone"></span> Phone: ' + phone + '</p><p> Group: ' + group+ '</p></div>');
		$(this).addClass('selected').siblings().removeClass('selected');
	});
	// bring up the form for new contact
	$(document).on('click', '#new-contact', function(){
		$('#c-detail').addClass('hidden');
		edit_btn.addClass('hidden');
		$form.removeClass('hidden');
		$('.selected').removeClass('selected');
	});
	// add new contact to the list on left hand side
	$(document).on('click', '#create-contact', function(){
		$form.addClass('hidden');
		new_name = $('#full-name').val();
		new_email = $('#email').val();
		new_phone = $('#phone').val();
		new_group = $('#group').val();
		var new_contact = { 
			full_name: new_name, 
			email: new_email,
			phone: new_phone,
			group: new_group
		};
		CBOOK.push(new_contact);
		getNames(CBOOK);
		resetForm();
	});
	// delete contact from contacts
	$(document).on('click', '.x-sign', function(e){
		e.stopPropagation();
		var is_sure = confirm('Are you sure?');
    if(is_sure) {
		
			var k = 0;
			while(k < CBOOK.length){
				if(CBOOK[k].full_name == $(this).parent().text()){
					$('#c-detail').empty().append('<p>Contact <strong>'+ CBOOK[k].full_name +'</strong> has been successfully deleted!</p>')
					CBOOK.splice(k, 1);
				}
				k++;
			}
			$(this).parent().remove();
			edit_btn.addClass('hidden');
			$form.addClass('hidden');
			$('#c-detail').removeClass('hidden');
    }else{
      return false;
    }
	});
	// edit selected contact
	$(document).on('click', '.edit', function(e){
		e.stopPropagation();
		var el = $(this).parent();
		el.addClass('selected').siblings().removeClass('selected');
		$form.find('#full-name').val(el.text());
		$form.find('#email').val(el.data('email'));
		$form.find('#phone').val(el.data('phone'));
		$form.find('#group').val(el.data('group'));
		$('#c-detail').addClass('hidden');
		$form.find('#create-contact').replaceWith('<button id="save-contact" type="button" class="btn btn-info">Done</button>');
		$form.removeClass('hidden');
	});
	// save edited contact
	$(document).on('click', '#save-contact', function(){
		$form.addClass('hidden');
		edited_name = $('#full-name').val();
		edited_email = $('#email').val();
		edited_phone = $('#phone').val();
		edited_group = $('#group').val();
		var edited_contact = { 
			full_name: edited_name, 
			email: edited_email,
			phone: edited_phone,
			group: edited_group
		};
		index = getIndexByName($('.selected').text());
		CBOOK[index] = edited_contact;
		getNames(CBOOK);
		resetForm();
	});

// search by name
	$('#search_by_name').keyup(function(){
		var search_term = $(this).val();
		search_term.length > 0 ? $('#remove_search_icon').fadeIn() : $('#remove_search_icon').fadeOut();
    $('.name_item').each(function(){
      if ($(this).text().search(new RegExp(search_term, "i")) < 0) {
          $(this).fadeOut();
      } else {
          $(this).show();
      }
    });
	});

	$(document).on('click', '#remove_search_icon', function(){
		$('#search_by_name').val('');
		$('.name_item').fadeIn();
		$(this).fadeOut();
	});
// end search by name

// filter by group
	$(document).on('click', '.group-item', function(){
		$('.ok').remove();
		var group_name = $(this).text();
		$('#groups').replaceWith('<button class="btn btn-default dropdown-toggle" type="button" id="groups" data-toggle="dropdown">'+group_name+'<span class="caret"></span></button>');
		$(this).replaceWith('<li class="group-item">'+ group_name +'<span class="glyphicon glyphicon-ok-circle ok"></span></li>');
		if(group_name === 'All Contacts'){
			$('.name_item').show()
		}else{
			$('.name_item').each(function(){
	      if ($(this).data('group').search(new RegExp(group_name, "i")) < 0) {
	          $(this).fadeOut('fast');
	      } else {
	          $(this).show();
	      }
	    });
		}
	});
// end filter by group

});