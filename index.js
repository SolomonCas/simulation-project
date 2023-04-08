$(document).ready(function(){
    console.log("Document Ready");
    submitButton = document.getElementById("submit");
    $("#input_form").submit(function(e){
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
        else {
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
            
            //Cache Memory Table
            //Create Elements
            $("#outputs").empty();
            let parent = $("#outputs");
            let div_table = document.createElement("div");
            let table = document.createElement("table");
            let table_head_row = document.createElement("tr");
            let table_header_block = document.createElement("th");
            let table_header_data = document.createElement("th");
            let div_paragraph = document.createElement("div");

            let paragraph_num_cache_hits = document.createElement("p");
            let num_cache_hits_text = document.createTextNode("Number of Cache Hits: " + hit);
            
            let paragraph_num_cache_miss = document.createElement("p");
            let num_cache_miss_text = document.createTextNode("Number of Cache Miss: " + miss);
            
            let paragraph_miss_penalty = document.createElement("p");
            let miss_penalty_text = document.createTextNode("Miss Penalty: " + miss_penalty);
            
            let paragraph_avg_memory_access_time = document.createElement("p");
            let avg_memory_access_time_text = document.createTextNode("Avg Memory Access Time: " + avg_memory_access_time);

            let paragraph_total_memory_access_time = document.createElement("p");
            let total_memory_access_time_text = document.createTextNode("Total Memory Access Time: " + total_memory_access_time);
            //Add classes
            $(div_paragraph).addClass("div-paragraph");
            // Set Hierarchy
            $(table_head_row).append(table_header_block);
            $(table_head_row).append(table_header_data);

            $(table).append(table_head_row);
            $(paragraph_num_cache_hits).append(num_cache_hits_text);
            $(paragraph_num_cache_miss).append(num_cache_miss_text);
            $(paragraph_miss_penalty).append(miss_penalty_text);
            $(paragraph_avg_memory_access_time).append(avg_memory_access_time_text);
            $(paragraph_total_memory_access_time).append(total_memory_access_time_text);

            $(div_table).append(table);
            $(div_paragraph).append(paragraph_num_cache_hits);
            $(div_paragraph).append(paragraph_num_cache_miss);
            $(div_paragraph).append(paragraph_miss_penalty);
            $(div_paragraph).append(paragraph_avg_memory_access_time);
            $(div_paragraph).append(paragraph_total_memory_access_time);

            $(parent).append(div_table);
            $(parent).append(div_paragraph);
            // Set Content
            $(table_header_block).text("Block");
            $(table_header_data).text("Data");

            for(let i = 0; i < cache_size; i++) {
                // Create ELement for data
                let table_row = document.createElement("tr");
                let table_header_block_number = document.createElement("th");
                let table_header_data_number = document.createElement("th");
                // Set Hierarchy for data
                $(table_row).append(table_header_block_number);
                $(table_row).append(table_header_data_number);

                $(table).append(table_row);
                // Set Content
                $(table_header_block_number).text(i);
                $(table_header_data_number).text(cache_memory[i]);
            }
        

        }
    });
});