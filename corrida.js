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
                console.log("recebi ",text);
                let matched = text.match(regex);
                if(matched){
                    console.log("achei", matched[0]);
                    return [matched[0], text.replace(matched[0],'')];
                }
                console.log("não achei")
                return [];
            }
        }

        let pullTimestamp = pullMaker(/([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.[0-9]{3}/); //matches timestamp
        let pullPilot = pullMaker(/[0-9]* . [A-Z ,.'-]+/i); //matches pilot

        let lines = textInput.split(/\r\n|\r|\n/); //splitting the lines
        lines.forEach(line => {

            let timestamp, pilot, lapNumber, lapTime, avgSpeed;

            [timestamp, line] = pullTimestamp(line);
            if( !timestamp )return;

            [pilot, line] = pullPilot(line);
            if( !pilot )return;


            if( !pilot )return;
            console.log(pilot)


            
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