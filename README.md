Corrida
=======
este é o repositório para o teste de aptidão para a posição de dev na NVS. A descrição do teste pode ser encontrada em [instruções.md](./instruções.md)
A implementação da solução do problema está em [corrida.js](./corrida.js). Teste de validade da solução pode ser encontrado em [corrida.test.js](./corrida.test.js)
Há duas formas de executar a solução: pelo browser, abrindo [index.html](./index.html) ( disponivel também em https://www.trjn.cc/corrida/ ) ou executando pelo Nodejs o arquivo [cli.js](./cli.js)

instruções de uso:
==================
Pelo browser:
-------------
Abra [index.html](./index.html) (ou acesse https://www.trjn.cc/corrida/). Há um botão para carregar o arquivo de entrada. Após a selecão do arquivo, a pagina exibira o arquivo que recebeu e o ranking computado em uma tabela; Abaixo da tabela há a saida no formato esperado pela proposta do problema. Caso queira baixar a saida em um arquivo de texto clique em download (caso queira escolher o nome do arquivo, clique com botão direto em download e selecione 'salvar link como').

Pelo Nodejs:
-------------
execute `node cli.js ./arquivo_de_entrada.txt ./arquivo_de_saida.txt` . caso o nome do arquivo de saida seja omitido, a saida sera `resultado.txt`;

para exutar os testes rode o arquivo corrida.test.js:
`node corrida.test.js`