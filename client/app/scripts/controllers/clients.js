'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ClientsCtrl
 * @description
 * # ClientsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ClientsCtrl', function ($scope, ClientsService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = {
		workex:[
			{name:'',startDate:'',endDate:''}
		],
		education:[
			{name:'',degree:'',stream:'',startDate:'',endDate:''}	
		]	
	};

	$scope.titles = ["Mr.", "Mrs.","Ms.","Dr."];

	$scope.addCompany = function(){
		$scope.user.workex.push({name:'',startDate:'',endDate:''});
	};

	$scope.removeCompany = function(index){
		$scope.user.workex.splice(index, 1);	
	};

	$scope.addUniversity = function(){
		$scope.user.education.push({name:'',startDate:'',endDate:''});
	};

	$scope.removeUniversity = function(index){
		$scope.user.education.splice(index, 1);	
	};

	$scope.calculateAge = function(dob){
		var now = new Date();
		var today = new Date(now.getYear(),now.getMonth(),now.getDate());
		
		var yearNow = now.getYear();
		var monthNow = now.getMonth();
		var dateNow = now.getDate();

		var dob = new Date($scope.user.dob);

	  	var yearDob = dob.getYear();
  		var monthDob = dob.getMonth();
  		var dateDob = dob.getDate();
		var age = {};
	  	var ageString = "";
	  	var yearString = "";
	  	var monthString = "";
	  	var dayString = "";


	 	var yearAge = yearNow - yearDob;

	  	if (monthNow >= monthDob)
	    	var monthAge = monthNow - monthDob;
	  	else {
	    	yearAge--;
	    	var monthAge = 12 + monthNow -monthDob;
	  	}

	  	if (dateNow >= dateDob)
	    	var dateAge = dateNow - dateDob;
	  	else {
	    	monthAge--;
	    	var dateAge = 31 + dateNow - dateDob;

	    	if (monthAge < 0) {
	      		monthAge = 11;
	      		yearAge--;
	    	}
	  	}

	  	age = {
	    	years: yearAge,
	      	months: monthAge,
	      	days: dateAge
	      	};
	    $scope.user.age = Math.round((yearAge + monthAge/12 + dateAge/360)*100)/100;
	  	if ( age.years > 1 ) yearString = " years";
	  	else yearString = " year";
	  	if ( age.months> 1 ) monthString = " months";
	  	else monthString = " month";
	  	if ( age.days > 1 ) dayString = " days";
	  	else dayString = " day";


	  	if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
	    	ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " old.";
	  	else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
	    	ageString = "Only " + age.days + dayString + " old!";
	  	else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
	    	ageString = age.years + yearString + " old. Happy Birthday!!";
	  	else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
	    	ageString = age.years + yearString + " and " + age.months + monthString + " old.";
	  	else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
	    	ageString = age.months + monthString + " and " + age.days + dayString + " old.";
	  	else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
	    	ageString = age.years + yearString + " and " + age.days + dayString + " old.";
	  	else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
	    	ageString = age.months + monthString + " old.";
	  	else ageString = "Oops! Could not calculate age!";

	  	$scope.user.ageString = ageString;
	};

	$scope.calculateExperience = function(){
		var totalLocalExp = 0;
		var totalOverseasExp = 0;
		var expRecordCount = $scope.user.workex.length;
		for(var i=0;i<expRecordCount;i++){
			if(($scope.user.workex[i].startDate != undefined) && ($scope.user.workex[i].startDate != '') && ($scope.user.workex[i].endDate != undefined) && ($scope.user.workex[i].endDate != '')){
				var startDate = new Date($scope.user.workex[i].startDate);
				var endDate = new Date($scope.user.workex[i].endDate);

				var yearStart = startDate.getYear();
				var monthStart = startDate.getMonth();
				var dateStart = startDate.getDate();

				var yearEnd = endDate.getYear();
				var monthEnd = endDate.getMonth();
				var dateEnd = endDate.getDate();

				var exp = {};

				var yearExp = yearEnd - yearStart;

	  			if (monthEnd >= monthStart)
	    			var monthExp = monthEnd - monthStart;
	  			else {
	    			yearExp--;
	    			var monthExp = 12 + monthEnd -monthStart;
	  			}

	  			if (dateEnd >= dateStart)
	    			var dateExp = dateEnd - dateStart;
	  			else {
	    			monthExp--;
	    			var dateExp = 31 + dateEnd - dateStart;

	    			if (monthExp < 0) {
	      				monthExp = 11;
	      				yearExp--;
	    			}
	  			}
	  			exp = {
	    			years: yearExp,
	      			months: monthExp,
	      			days: dateExp
	      		};
	      		if($scope.user.workex[i].local)
	    			totalLocalExp = Math.round((totalLocalExp + yearExp + monthExp/12 + dateExp/360)*100)/100;
	    		else
	    			totalOverseasExp = Math.round((totalOverseasExp + yearExp + monthExp/12 + dateExp/360)*100)/100;
			}
		}

		$scope.user.localExpString = "Australia Experience " + totalLocalExp + " years";
		$scope.user.overseasExpString = "Overseas Experience " + totalOverseasExp + " years";
		$scope.user.localExp = totalLocalExp;
		$scope.user.overseasExp = totalOverseasExp;
	};

	$scope.saveDetails = function(){
		ClientsService.save($scope.user, function(client){
			console.log(client);
		})	
	};

	$scope.retrieveDetails = function(){
		ClientsService.query({email: $scope.user.email},function(response){
			console.log(response);
			$scope.user = response[0];
		});
	};

  })
.factory('ClientsService',function($resource){
		return $resource('http://localhost:3000/api/clients');
	});
