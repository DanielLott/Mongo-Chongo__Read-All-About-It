// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
	$("#scrape").on("click", function (event) {
		var id = $(this).data("id");

		// Send the PUT request.
		$.ajax("/scrape", {
			type: "GET"
		}).then(
			function () {
				// Reload the page to get the updated list
				location.reload();
			}
		);
		
	});

	// $(".create-form").on("submit", function (event) {
	// 	// Make sure to preventDefault on a submit event.
	// 	event.preventDefault();

	// 	var newBurger = {
	// 		name: $("#nameEntry").val().trim()
	// 		// sleepy: $("[name=sleepy]:checked").val().trim()
	// 	};

	// 	// Send the POST request.
	// 	$.ajax("/api/burgers", {
	// 		type: "POST",
	// 		data: newBurger
	// 	}).then(
	// 		function () {
	// 			console.log("created new burger");
	// 			// Reload the page to get the updated list
	// 			location.reload();
	// 		}
	// 	);
	// });

	// $(".delete-cat").on("click", function (event) {
	//     var id = $(this).data("id");

	//     // Send the DELETE request.
	//     $.ajax("/api/cats/" + id, {
	//         type: "DELETE"
	//     }).then(
	//         function () {
	//             console.log("deleted cat", id);
	//             // Reload the page to get the updated list
	//             location.reload();
	//         }
	//     );
	// });
});
