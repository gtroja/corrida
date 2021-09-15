class Corrida {   

    constructor(textInput){

        this.laps = [];
        this.pilots = [];

        if (textInput) this._setInput(textInput);
    }



    getResult(textInput){
        try {            
            return  this.compileResults(
                    this.constructRanking(
                    this.parse(textInput)));
        }
        catch(e){
            console.log("erro",e)
        }
    }

    _setInput(textInput){
        

    }

    getResultText(textInput){
        return "I work"    
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
            if( !timestamp ){ console.warn(`erro na linha ${index} ao tentar ler timestamp\n line:\n ${original}`);return;}

            [pilot, line] = pullPilot(line);
            if( !pilot ){ console.warn(`erro na linha ${index} ao tentar ler pilot\n line:\n ${original}`);return;}

            [lapNumber, line] = pullLapNumber(line);
            if( !lapNumber ){ console.warn(`erro na linha ${index} ao tentar ler lapNumber\n line:\n ${original}`);return;}
            
            [lapTime, line] = pullLapTime(line);
            if( !lapTime ){ console.warn(`erro na linha ${index} ao tentar ler lapTime\n line:\n ${original}`);return;}

            [avgSpeed, line] = pullAvgSpeed(line);
            if( !avgSpeed ){ console.warn(`erro na linha ${index} ao tentar ler avgSpeed\n line:\n ${original}`);return;}
            
            laps.push([timestamp, pilot.trim(), lapNumber, lapTime, avgSpeed])            
            
        });
        return [];
    }

    constructRanking(lapArray){
        return [];
    }

    compileResults(pilotArray){
        return "i work :)";
    }

}

if(typeof module !== 'undefined'){//for using in nodejs
    module.exports = Corrida;
}
