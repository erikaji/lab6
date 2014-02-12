'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */

var data;
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();
	var project = $(this).closest('.project');
	var projectID = project.attr('id');
	var details = $(project).find(".project-details");
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
	console.log("User clicked on project " + idNumber);
	
	$.get('/project/' + idNumber, blankFn);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get('/palette', blankFn2);
	console.log("User clicked on color button");
}

function blankFn(result) {
	var projectHTML = '<a href="/project/' + result['id'] + '">' +
	'<img src="' + result['image'] + '" class="detailsImage">' +
	'<p>' + result['title'] + '</p>' +
	'<p><small>' + result['date'] + '</small></p></a>' + 
	'<p><small>' + result['summary'] + '</p>';
	$("#project" + result['id'] + " .details").html(projectHTML);
}

function blankFn2(result) {
	console.log("blankfn2 reached");
	console.log(result['colors']['hex'][0]);
	var colors = [result['colors']['hex'][0], result['colors']['hex'][1], result['colors']['hex'][2], result['colors']['hex'][3], result['colors']['hex'][4]];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}