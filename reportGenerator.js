const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const nameList = {};
const data = [];
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);
    var name;
    for(var i=0;i<results.length;i++){
        name=results[i]['Created By'];

        if(!(name in nameList)){
            nameList[name]={"Blocker":0,"Critical":0,"Major":0,"Medium":0,"Minor":0};
        }

        severity=results[i]['Severity'];
        //console.log(severity);

        switch(severity){
            case '0-Blocker':
                nameList[name]['Blocker']++;
                break;
            case '1-Critical':
                nameList[name]['Critical']++;
                break;
            case '2-Major':
                nameList[name]['Major']++;
                break;
            case '3-Medium':
                nameList[name]['Medium']++;
                break;
            case '4-Minor':
                nameList[name]['Minor']++;
                break;
        }
    }
    //console.log(nameList);
    for(i in nameList){
        document.getElementById("data").innerHTML = i;
        //console.log(i);
    }
  });
