// ===================================================================

// 						COUNT TASKS

// ===================================================================

function countTasks() {
		
		$('.tasks_counter').each(function() {
			
			var counter = $(this),
				currentLi = counter.closest('.whole_column').find('li'),
				numberOfTasks = currentLi.length;

			counter.text(numberOfTasks);
		});
}


// ===================================================================

// 			MAKE HEIGHTS 0F BODY, #tasks_div AND WINDOW EQUAL

// ===================================================================

function setHeight() {
    var windowHeight = $(window).innerHeight();
    $('body').css('min-height', windowHeight);
    $('#tasks_div').css('min-height', windowHeight);
};


// ===================================================================

// 				CALL FUNCTIONS ON RESIZE

// ===================================================================

$(window).resize(function() {
    setHeight();
});


// ===================================================================

// 			CREATE addNewTask() WITH FOCUSED INPUT

// ===================================================================

function addNewTask(inputParam) {

	var newTask = inputParam.val(),

		person = inputParam.closest('.column_info_container').find('input[name=person]:checked').val();

	if (newTask.length > 0) {
		
		var currentColumn = inputParam.closest('.column_info_container').find('.columns-ul');
		
		if (person != undefined) {
			currentColumn.append(
						"<li>" + 
							"<a href='#' class='task_link'>" + newTask + "</a>" +
							"<span class='pic_span'><img src=images/"+person+".png></span>" + 
						"</li>"
			);
		} else {
			currentColumn.append(
				"<li>" + 
					"<a href='#' class='task_link'>" + newTask + "</a>" +
					"<span class='pic_span'><img src=images/not_asigned.png></span>" + 
				"</li>"
			);
		}

		inputParam.val("");
	}		
}

// ===================================================================

// 			CREATE addBtnClick() WITH FOCUSED INPUT
// 			CALL addNewTask(inputParam) AND countTasks();

// ===================================================================

function addBtnClick(inputParam) {
	
	var currentAddBtnSmall = inputParam.closest('.column_info_container').find('.addBtnSmall');
	
	currentAddBtnSmall.on('click', function(e) {
		e.preventDefault();
    	addNewTask(inputParam);
    	countTasks();
    	currentAddBtnSmall.off('click');
	});
}


// ===================================================================
// ===================================================================

// 					DOCUMENT READY

// ===================================================================
// ===================================================================

$(document).ready(function() {

	// ================================================================

	// 				GET JSON AND PUT DATA IN COLUMNS

	// ================================================================
	$.when(
    	$.getJSON('js/waiting.json'),
    	$.getJSON('js/progress.json'),
    	$.getJSON('js/review.json')
	).then(function(waiting, progress, review) {

		var waitingList = waiting[0],
            	waitingListTemplateHtml,
            	waitingListTemplate,

            	progressList = progress[0],
            	progressListTemplateHtml,
            	progressListTemplate,

            	reviewList = review[0],
            	reviewListTemplateHtml,
            	reviewListTemplate;

    		waitingListTemplateHtml = document.getElementById('waiting-list-template').innerHTML;
    		waitingListTemplate = Handlebars.compile(waitingListTemplateHtml);
    		document.getElementById('column_1').innerHTML = waitingListTemplate({waitingList});

    		progressListTemplateHtml = document.getElementById('progress-list-template').innerHTML;
    		progressListTemplate = Handlebars.compile(progressListTemplateHtml);
    		document.getElementById('column_2').innerHTML = progressListTemplate({progressList});

    		reviewListTemplateHtml = document.getElementById('review-list-template').innerHTML;
    		reviewListTemplate = Handlebars.compile(reviewListTemplateHtml);
    		document.getElementById('column_3').innerHTML = reviewListTemplate({reviewList});


		// ================================================================

		// 					HEADER ACTIVE LINK

		// ================================================================

		var activeLink = 'header ul li a.header_a';

		$(activeLink).on('click', function() {

			$(activeLink).removeClass('active_nav');
			$(this).addClass('active_nav');
		});


		// ================================================================

		// 					SHOW ADD INPUT

		// ================================================================

		$('.addBtn').on('click', function() {
			$(this).closest('.add_container').find('.add_div').toggle();
		});


		// ================================================================

		// 					GET FOCUSED INPUT
		//					CALL addBtnClick()

		// ================================================================	

		$('.add_input').on('focus',function() {
			var currentInput = $(this);
			addBtnClick(currentInput);
		});



		// CALL FUNCTIONS
		countTasks();
		setHeight();

	}); // end of $.when/then

}); // end of $(document).ready