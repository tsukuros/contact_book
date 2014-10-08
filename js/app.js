var CBOOK = CBOOK || [
{
	full_name: 'Vlada Boiko',
	email: 'vladaboiko@gmail.com',
	phone: '+380937402119',
	group: 'family'
},
{
	full_name: 'Sergey Vlasenko',
	email: 'sergeyvlasenko@gmail.com',
	phone: '+380934956010',
	group: 'family'
},
{
	full_name: 'Alex Marusik',
	email: 'alexmarusik@gmail.com',
	phone: '+380957733119',
	group: 'work'
},
{
	full_name: 'Roger Graves',
	email: 'rogergraves@gmail.com',
	phone: '+380463733134',
	group: 'work'
},
{
	full_name: 'Dmytriy Melnichenko',
	email: 'dmytriymelnichenko@gmail.com',
	phone: '+380939872497',
	group: 'school'
},
{
	full_name: 'Jimmy Hill',
	email: 'jimmyhill@gmail.com',
	phone: '+380631245447',
	group: 'english'
},
{
	full_name: 'Many Trueman',
	email: 'manytrueman@gmail.com',
	phone: '+380671471234',
	group: 'english'
},
]

var CGROUPS = CGROUPS || ['family', 'work', 'school', 'english'];

jQuery(function($){
	var name,
			email,
			phone,
			group,
			new_name,
			new_email,
			new_phone,
			new_group,
			selected,
			edit_btn = $('#edit'),
			index,
			$container = $('#content'),
			$form = $('form'),
			current_group_contacts = $('.name_item');

	function getNames(list){
		var i = 0;
		var list_of_names = '<div id="names-list">';
		while(i < list.length){
			list_of_names += '<div id="'+ convertToSlug(list[i].full_name) +'" class="name_item" data-email="' + list[i].email + '" data-phone="' + list[i].phone + '" data-group="' + list[i].group + '">' + list[i].full_name + '<span data-toggle="tooltip" data-placement="top" title="Transfer Contact To:" class="glyphicon glyphicon-transfer transfer"></span><span data-toggle="tooltip" data-placement="top" title="Edit Contact" class="glyphicon glyphicon-edit edit"></span><span data-toggle="tooltip" data-placement="top" title="Remove Contact" class="glyphicon glyphicon-remove x-sign"></span></div>' 
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

	function getTransferGroups(list){
		var t = 0;
		var list_of_groups = '<ul id="transfer-group-list"><li class="untransferable">All Contacts</li>';
		while(t < list.length){
			list_of_groups += '<li class="li-divider"></li><li class="transfer-group-item">'+list[t]+'</li>'
			t++;
		}
		list_of_groups += '</ul>';
		// $('#transfer-group-list').replaceWith(list_of_groups);
		return list_of_groups;
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

	function closeOpenPopover(){
		if($('.popover').length > 0){
			$('.selected').find('.transfer').click();
		}
	}

	function createGroup(group_name, contact_list){
		var c_names = [];
		if(group_name){
			CGROUPS.push(group_name);
			getGroups(CGROUPS);
			$('#new-group').popover('toggle');
			contact_list.each(function(){
				var index = getIndexByName($(this).text());
				c_names.push($(this).text());
				CBOOK[index].group = group_name;
			});
			getNames(CBOOK);
			$('#c-detail').replaceWith('<div id="c-detail">Group <strong>'+ group_name +'</strong> has been successfully created with '+ contact_list.length +' contact'+(contact_list.length == 1 ? '' : 's')+'('+ c_names.join(', ') +').</div>').removeClass('hidden');
		}
	}

	function validateEmail(field) {

      var email_str = field.val();
      var result_str = email_str.match('^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$');

      if (result_str == null) {
          if ($('.user_email_error').length > 0) {
              return false;
          } else {
              field.parent().addClass('has-error')
                  .append('<span class="user_email_error">Please provide valid email.</span>');
          }
      } else {
          field.parent().removeClass('has-error');
          $('.user_email_error').remove();
          return field.val();
      }
  }

  function  validateUsername(field) {
        
        if (field.val().length < 1) {
            if ($('.user_name_error').length > 0) {
                return false;
            } else {
                field.parent().addClass('has-error').append('<span class="user_name_error">Name can\'t be blank.</span>');
            }
        } else {
            field.parent().removeClass('has-error');
            $('.user_name_error').remove();
            return field.val()
        }
    }

  function validatePhone(field) {

      var phone_str = field.val();
      var result_str = phone_str.match('1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?');

      if (result_str == null) {
          if ($('.user_phone_error').length > 0) {
              return false;
          } else {
              field.parent().addClass('has-error')
                  .append('<span class="user_phone_error">Phone should be 12 digits(excluding plus sign) and start with +380.</span>');
          }
      } else {
          field.parent().removeClass('has-error');
          $('.user_phone_error').remove();
          return field.val();
      }
  }
	
	getNames(CBOOK);
	getGroups(CGROUPS);
	// show selected contact
	$(document).on('click', '.name_item', function(e){
		if(e.ctrlKey || e.metaKey){
			closeOpenPopover();
			$(this).toggleClass('selected');
			if ($('.selected').length > 1){
				$('.hint').text('Hit button above!')
			}else {
				$('.hint').text('Ctrl(Cmd) + Click to select multiple contacts.')
			}
		}else{
			closeOpenPopover();
			$('.hint').text('Ctrl(Cmd) + Click to select multiple contacts.');
			$form.addClass('hidden');
			name = $(this).text();
			email = $(this).data('email');
			phone = $(this).data('phone');
			group = $(this).data('group');
			$container.find('#c-detail').replaceWith('<div id="c-detail"><p><span class="glyphicon glyphicon-user"></span> Full Name: ' + name + '</p><p><span class="glyphicon glyphicon-envelope"></span> Email: ' + email + '</p><p><span class="glyphicon glyphicon-phone"></span> Phone: ' + phone + '</p><p> Group: ' + group+ '</p></div>');
			$(this).addClass('selected').siblings().removeClass('selected');
		}
	});
	// bring up the form for new contact
	$(document).on('click', '#new-contact', function(){
		closeOpenPopover();
		$('#c-detail').addClass('hidden');
		$form.removeClass('hidden');
		$form.find('input').val('');
		$form.find('#phone').val('+380');
		$('.selected').removeClass('selected');
	});
	// add new contact to the list on left hand side
	$(document).on('click', '#create-contact', function(){
		closeOpenPopover();
		
		new_name = validateUsername($('#full-name'));
		new_email = validateEmail($('#email'));
		new_phone = validatePhone($('#phone'));
		new_group = $('#group').val();

		if(new_name && new_email && new_phone){
			$form.addClass('hidden');
			var new_contact = { 
				full_name: new_name, 
				email: new_email,
				phone: new_phone,
				group: new_group
			};
			CBOOK.push(new_contact);
			getNames(CBOOK);
			resetForm();
		}
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
		closeOpenPopover();
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
		closeOpenPopover();

		edited_name = validateUsername($('#full-name'));
		edited_email = validateEmail($('#email'));
		edited_phone = validatePhone($('#phone'));
		edited_group = $('#group').val();
		if(edited_name && edited_email && edited_phone){
			$form.addClass('hidden');
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
		}
	});

// filter by name
	$('#search_by_name').keyup(function(){
		var search_term = $(this).val();
		search_term.length > 0 ? $('#remove_search_icon').fadeIn() : $('#remove_search_icon').fadeOut();
    current_group_contacts.each(function(){
      if ($(this).text().search(new RegExp(search_term, "i")) < 0) {
          $(this).fadeOut();
      } else {
          $(this).show();
      }
    });
	});
	// remove search term
	$(document).on('click', '#remove_search_icon', function(){
		$('#search_by_name').val('');
		$('.name_item').fadeIn();
		$(this).fadeOut();
	});
// end search by name

// filter by group
	$(document).on('click', '.group-item', function(){
		closeOpenPopover();
		$('.ok').remove();
		var group_name = $(this).text();
		$('#groups').replaceWith('<button class="btn btn-default dropdown-toggle" type="button" id="groups" data-toggle="dropdown">'+group_name+'<span class="caret"></span></button>');
		$(this).replaceWith('<li class="group-item">'+ group_name +'<span class="glyphicon glyphicon-ok-circle ok"></span></li>');
		if(group_name === 'All Contacts'){
			current_group_contacts = $('.name_item');
			current_group_contacts.show();
		}else{
			$('.name_item').each(function(){
	      if ($(this).data('group').search(new RegExp(group_name, "i")) < 0) {
	          $(this).fadeOut('fast');
	      } else {
	          $(this).show();
	      }
	    });
	    current_group_contacts = $('[data-group="' + group_name + '"]');
		}
		if($('#search_by_name').val() != ""){
			$('#search_by_name').trigger('keyup');	
		}
	});
// end filter by group

// create new group
	$('#new-group').popover({ 
	    html : true,
	    title: function() {
	      return $("#popover-head").html();
	    },
	    content: function() {
	      return $("#popover-content").html();
	    }
	});

	$(document).on('click', '#done_button', function(){
		selected = $('.selected');
		createGroup($('#group-name').val(), selected);
	});
	// create new group by hitting enter
	$(document).on('keyup', '#group-name', function(e){
		selected = $('.selected');
		if(e.which == 13){
			createGroup($('#group-name').val(), selected);
		}
	});

	$('#new-group').on('shown.bs.popover', function () {
		$('#group-name').focus();
		selected = $('.selected');
		if(selected.length > 0){
			$('.popover-title').html('New Group: <span class="badge">'+ selected.length +'</span> contact'+(selected.length == 1 ? '' : 's')+' selected');
		}else{
			$('#new-group').popover('hide');
			alert('No Contact Selected');
		}
	});
// end create new group

// add contact to specific group
	$('.transfer').popover({ 
	    html : true,
	    title: function(){
	    	return 'Transfer Contact To:';
	  	},
	    content: $(getTransferGroups(CGROUPS)),
	    placement: 'right',
	    container: 'body'
	});

	$(document).on('click', '.transfer', function(e){
		e.stopPropagation();
		var el = $(this).parent();
		el.addClass('selected').siblings().removeClass('selected');
		el.popover('show');
	});

	$('.transfer').on('show.bs.popover', function(){
		if($('.popover').length > 0){
			$('.selected').find('.transfer').click();
		}
	});

	$('.transfer').on('shown.bs.popover', function(){
		var index = getIndexByName($(this).parent().text());
		var el_group_name = CBOOK[index].group;
		$('.transfer-group-item').each(function(){
			if($(this).text() == el_group_name){
				$(this).addClass('untransferable').siblings().removeClass('untransferable');
			}
		});
	})

	$(document).on('click', '.transfer-group-item', function(){
		if($(this).hasClass('untransferable')){
			return false;
		}else{
			var el = $('.selected');
			var index = getIndexByName(el.text());
			CBOOK[index].group = $(this).text();
			el.data('group', $(this).text());
			el.find('.transfer').click();
			getGroups(CGROUPS);
		}
	});
// end add contact to specific group

});