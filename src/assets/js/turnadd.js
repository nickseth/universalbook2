$(window).on('swipeleft', () => {
    alert('left')
    $('.redhat').css('transform','rotateY(180deg)')
    // module = true
  	// return module.exports;
    });


    
    $(window).on('swiperight', () => {
     alert("right")
     $('.redhat').css('transform','rotateY(180deg)')
    });
 