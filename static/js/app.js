function create_selections(){
d3.json("data/samples.json").then((importeddata) => {
        var data = [importeddata]
        console.log(data[0])
        var options =   data[0].names
        console.log(options)
    select = document.getElementById('selDataset');

    for (var i = 0; i<=options.length; i++){
        var opt = document.createElement('option');
        console.log(options[i])
        opt.value = options[i];
        opt.innerHTML = options[i];
        select.appendChild(opt);
}})
};

create_selections()



function buildplot(){
d3.json("data/samples.json").then((importeddata) => {
    var data = [importeddata]
    console.log(data)
    var select = document.getElementById('selDataset');
    var input = select.options[select.selectedIndex].value;
    console.log(input)
    sample_values = []
    otu_ids = []
    text = []
    console.log(data[0].samples[2].id)
    for (var i = 0; i < data[0].samples.length; i++){
        if (data[0].samples[i].id == input){
            sample_values = data[0].samples[i].sample_values
            otu_ids = data[0].samples[i].otu_ids
            text = data[0].samples[i].otu_labels
            metadata = data[0].metadata[i]
            console.log(`input is ${input}`)
            console.log(`id is ${data[0].samples[i].id}`)
            console.log(i)
        }
        else {console.log(`did not match ${i}`)}
    }

    var trace1 = {
        x: sample_values, 
        y: otu_ids,
        text: text,
        type: "bar",
        orientation: "h",
        marker: {
            width: 1
        }
}       
        console.log('got trace 1')
        console.log(otu_ids)
        var data = [trace1]
        var layout = { 'title' : `Subject ${input}`, 'yaxis' : {type: 'category'} } 
        Plotly.newPlot("bar", data, layout); 

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              size: sample_values,
              sizemode:'area',
              color: otu_ids,
            
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: 'Bubble Chart',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot("bubble", data, layout);
          metadata = JSON.stringify(metadata)
          console.log(`this is the demographic data ${metadata}`)
          document.getElementById("sample-metadata").innerHTML = metadata


})

}
buildplot();

var ID_selection = d3.select(".selDataset")
ID_selection.on("change", buildplot);


