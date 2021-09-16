class Corrida {   

    constructor(textInput){

        this.laps = [];
        this.pilots = [];
        this.ranking = [];

        if (textInput) this.setInput(textInput);
    }

    setInput(textInput){
        this.laps = this.parse(textInput); 
        this.pilots = this.getPilots(this.laps);
        this.ranking = this.constructRanking(this.pilots);
    }


    getResult(textInput){
        if(textInput) this.setInput(textInput);
        return this.ranking;
    }


    getResultText(textInput){
        if(textInput) this.setInput(textInput);
        let result = '';
        this.ranking.forEach((line) => {
            line.forEach(d => result = result.concat(`${d};`));
            result = result.concat('\n');
        })
        return result;
    }


    timeToMili(time){
        let mili = parseInt(time.match(/(?<=\.)[0-9]{3}/)[0]);
        let arr = time.match(/[0-5]{0,1}[0-9]:[0-5][0-9]/)[0].split(":");
        arr[1] = parseInt(arr[1]) + 60*parseInt(arr[0]);
        mili += 1000*arr[1];

        return mili;
    }

    miliToTime(mili){
        let min = parseInt(mili / 60000);
        mili %= 60000;
        let sec = parseInt(mili/1000);
        mili %= 1000;
        return `${min}:${('0'+sec).slice(-2)}.${('00'+mili).slice(-3)}`;
    }


    parse(textInput){

        if(typeof textInput !== 'string')   throw("Espero uma string como entrada")

        let pullMaker = (regex) => {
            return (text)=>{
                let matched = text.match(regex);
                if(matched){
                    return [matched[0], text.replace(matched[0],'')];
                }
                return [];
            }
        }

        let pullTimestamp = pullMaker(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.[0-9]{3}/); //matches timestamp
        let pullPilot = pullMaker(/[0-9]{1,3} . [A-Z][A-Z ,.'-]+/i); //matches pilot
        let pullLapNumber = pullMaker(/[1-4]/);//matches lap number
        let pullLapTime = pullMaker(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]\.[0-9]{3}/);// matches lap time
        let pullAvgSpeed = pullMaker(/[0-9]{1,},[0-9]{1,3}/);// matches avg speed

        let laps = [];
        let lines = textInput.split(/\r\n|\r|\n/); //splitting the lines
        lines.forEach((line, index) => {
            let original = `${line}`;
            let timestamp, pilot, lapNumber, lapTime, avgSpeed;

            [timestamp, line] = pullTimestamp(line);
            if( !timestamp ){ console.warn(`erro na linha ${index} ao tentar ler timestamp\n line:\n "${original}"`);return;}

            [pilot, line] = pullPilot(line);
            if( !pilot ){ console.warn(`erro na linha ${index} ao tentar ler pilot\n line:\n "${original}"`);return;}

            [lapNumber, line] = pullLapNumber(line);
            if( !lapNumber ){ console.warn(`erro na linha ${index} ao tentar ler lapNumber\n line:\n "${original}"`);return;}
            
            [lapTime, line] = pullLapTime(line);
            if( !lapTime ){ console.warn(`erro na linha ${index} ao tentar ler lapTime\n line:\n "${original}"`);return;}

            [avgSpeed, line] = pullAvgSpeed(line);
            if( !avgSpeed ){ console.warn(`erro na linha ${index} ao tentar ler avgSpeed\n line:\n "${original}"`);return;}
      
            laps.push([timestamp, pilot.trim(), lapNumber, lapTime, avgSpeed])            
            
        });
        return laps;
    }

    getPilots(laps){

        let pilots = [];
        let raceFinished = false;
        laps.forEach((lap)=>{
            if(!raceFinished){
                raceFinished = (lap[2] == 4) 
                let entry = {
                    number : 0,
                    name : "",
                    laps : []
                }
                let pilot = lap[1];//pilot number + name combo
                entry['number'] = parseInt(pilot.match(/[0-9]+/));
                entry['name'] = pilot.match(/[A-Z][A-Z ,.'-]+/i)[0];

                if(pilots.filter(p => p['number'] == entry['number']).length == 0){
                    entry['laps'].push(lap);
                    pilots.push(entry);
                }
                else{
                    pilots.filter(p => p['number'] == entry['number'])[0]['laps'].push(lap);
                }
            }

        });

        let getRaceTime = (pilot) => {
            let totalTime = 0


            pilot['laps'].forEach( lap => {
                totalTime += this.timeToMili(lap[3]); 
            }
            )
            return totalTime;
        }

        pilots.forEach((p)=> p['totalTime'] = getRaceTime(p));

        return pilots
    }

    constructRanking(pilots){
        /**
        * 1 - Posição Chegada;
        * 2 - Código Piloto;
        * 3 - Nome Piloto;
        * 3 - Qtde Voltas Completadas;
        * 4 - Tempo Total de Prova;
         */
        let pilotLaps = [];
        let ranking = [];



        //separa os pilotos em quantidade de voltas completadas
        for(var i=0;i<=4;i++){
            pilotLaps[i] = pilots.filter(p=>p['laps'].length == i)
        }
        
        //ordena os pilotos em cada categoria
        for(var i=0;i<=4;i++){
            pilotLaps[i] = pilotLaps[i].sort((a,b) => {
                a['totalTime'] > b['totalTime']
            } )
        }

        //formata e concatena 
        for(var i=4;i>=0;i--){
            if(pilotLaps[i]){
                pilotLaps[i].forEach((p)=>{
                    let entry = [
                        ranking.length + 1, //position
                        `${('00'+ p['number']).slice(-3)}`,//three digit pilot code
                        p['name'],
                        p['laps'].length,
                        this.miliToTime(p['totalTime'])
                    ]
                    debugger;
                    ranking.push(entry)}
                );
            }
        }
        return(ranking);

    }

    compileResults(pilotArray){
        this.getPilots(this.laps);    
        return "i work :)";
    }


}

if(typeof module !== 'undefined'){//for using in nodejs
    module.exports = Corrida;
}
