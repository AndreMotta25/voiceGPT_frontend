# VoiceGPT
Apresento a você, o voiceGPT, com essa aplicação voce pode comandar o chatGPT por voz! 
Isso aqui é só o front-end, para poder começar a usar de verdade voce vai precisar do back-end.  

Acredito que essa ideia tem muito potencial, especialmente porque permite que pessoas com deficiência visual usem a plataforma com facilidade. Há espaço para melhorias, mas acredito que é um bom começo. 

Sinta-se a vontade para mexer no codigo. Se o fizer, de uma ```estrelinha```

## Observação
Esse foi um projeto simples, então não vi a necessidade de aplicar alguns padrões e estilos que normalmente se tem em uma aplicação React. 
Como dito antes, por ser um projeto simples, não há um sistema de login, pois acredito que isso iria tirar a simplicidade do projeto. 

## Bibliotecas usadas
* Axios
* commitizen
* cz-emoji-conventional
* react-toastify
* uuid
* Typescript

# Começando
Para esse inicio, voce já deve ter o back-end rodando. Com tudo pronto, digite ```yarn install``` e ```yarn start```.
A tela de inicio é bem simples e intuitiva, nada muito diferente do chatGPT original. 

## Ditando um texto 
Se quiser ditar algum texto para o chat, voce pode pressionar o ```f2``` do seu teclado, assim o microfone vai ficar ouvindo o que é falado. Essa parte usa a api do google, então certifique-se de ter uma conta de serviço para isso. 


## Ouvindo as conversas
Ao final de cada conversa, há um icone de auto-falante, ao pressiona-lo, a api de sintese de fala do navegador vai ser acionado e o texto será falado por uma voz, padrão do seu navegador. 
