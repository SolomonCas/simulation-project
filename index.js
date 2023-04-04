$(document).ready(function(){
    submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(e){
        e.preventDefault();
        console.log("submit function");
        block_size = $("#block_size").val();
        main_memory_size = $("#main_memory_size").val();
        mm_type = $("#mm_type").val();
        cache_size = $("#cache_size").val();
        cache_type = $("#cache_type").val();
        memory_block_sequence = $("#memory_block_sequence").val();
        cache_access_time = $("#cache_access_time").val();
        memory_access_time = $("#memory_access_time").val();
        console.log("");
    });
});