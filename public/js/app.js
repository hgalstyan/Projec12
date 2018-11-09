$(document).ready(function(){
    $(".trip_container").ready(function(){
        $.get("/upload", function(data, satus){
            fillTrips(data);
        });
    });
    
    function fillTrips(trips){
        if(trips.length == 0) $(".trip_container").append(`<h4> You did't plan any trips. Fix it now! </h4>`);
        trips.map(trip=>{
            $(".trip_container").append(`
                    <div class="trip col">
                        <span class="btn_delete"></span>
                        <a href="/map?l=${trip._id}">
                            <h4 class="city">${trip.city}</h4>
                            <p class="places">Places: ${trip.quantity}</p>
                        </a>
                    </div>
                    `);
        });
    }
    
    
    $(document).on("click",".btn_delete" ,function(e){
        //getting ID of the trip
        const id = e.target.offsetParent.children[1].attributes[0].nodeValue.split("=")[1];
        $(e.target.parentNode).remove();
        $.ajax({
            url: "/delete",
            type: 'post',
            data: {_method: 'delete', id :id},
            success:function(msg){
                console.log("removed");
            }
        });
    });
});

