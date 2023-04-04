$(document).ready(function(){
    submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(e){
        e.preventDefault();
        console.log("submit function");
        block_size = parseInt($("#block_size").val());
        main_memory_size = parseInt($("#main_memory_size").val());
        mm_type = $("#mm_type").val();
        cache_size = parseInt($("#cache_size").val());
        cache_type = $("#cache_type").val();
        memory_block_sequence = $("#memory_block_sequence").val();
        cache_access_time = parseInt($("#cache_access_time").val());
        memory_access_time = parseInt($("#memory_access_time").val());
        miss_penalty = (cache_access_time * 2) + (memory_access_time * 2); 
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
        
        var cache_memory = new Array(cache_size); 
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

        var avg_memory_access_time = (hit/sequence.length) * cache_access_time + (miss/sequence.length) * miss_penalty;
        var total_memory_access_time = (hit * 2 * cache_access_time) + (miss * 2 * (cache_access_time + memory_access_time)) +(miss * cache_access_time);
        //
        //OUTPUT
        console.log("Data in Cache Memory: " + cache_memory);
        console.log("Number of Cache Hits: " + hit);
        console.log("Number of Cache Miss: " + miss);
        console.log("Miss Penalty: " + miss_penalty);
        console.log("Avg Memory Access Time: " + avg_memory_access_time);
        console.log("Total Memory Access Time: " + total_memory_access_time);
        

    });
});