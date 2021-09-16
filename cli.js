const Corrida = require('./corrida.js');
const fs  = require('fs');

fs.readFile(process.argv[2], 'utf8', (err,data) => {

    if (err) {
        console.error("Não consegui abrir o arquivo");
        process.exit();
    }

    let corrida = new Corrida(data);
    let outputText = corrida.getResultText();
    let filename = process.argv.length > 3 ? process.argv[3] : './resultado.txt';

    fs.writeFile(filename, outputText, (err) => {
        if (err) {
            console.error("Não consegui salvar o arquivo", err);
            process.exit();
        }
        console.table(corrida.getResult());
    });
    
    
});


