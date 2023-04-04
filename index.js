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

        if(mm_type == "words") {
            main_memory_size = main_memory_size / block_size;
        }
        if(cache_type == "words") {
            cache_size = cache_size / block_size;
        }

        sequence = memory_block_sequence.split(",");
        if(main_memory_size != sequence.length){
            alert("Incorrect memory size or sequence length");
        }
        var hit = 0;
        var miss = 0;
        var recent_block = 0;
        var placed = false;
        // cache_memory[cache_size][0] == Block, cache_memory[cache_size][1] == Data
        
        var cache_memory = new Array(parseInt(cache_size)); 
        for(let i = 0; i < sequence.length; i++){
            placed = false;
            for(let j = 0; j < cache_size; j++) {
                if(cache_memory[j] == null){
                    cache_memory[j] = sequence[i];
                    recent_block = j;
                    miss++;
                    placed = true;
                    break;
                }
                else if (cache_memory[j] == sequence[i]){
                    hit++;
                    recent_block = j;
                    placed = true;
                    break;
                }
            }
            if(!placed){
                cache_memory[recent_block] = sequence[i];
                miss++;
            }
            
        }
        console.log("cache memory: " + cache_memory);
        console.log("hit: " + hit);
        console.log("miss: " + miss);

    });
});