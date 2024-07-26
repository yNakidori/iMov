# iMov Admin Application

Esta aplicação é desenvolvida em React para a administração de imóveis de alto valor, utilizando o modelo de linguagem natural da OpenAI para auxiliar os usuários e o Firebase como banco de dados.

## Índice

- [Instalação](#instalação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Instalação

Para instalar e rodar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente para conectar ao Firebase e ao modelo de linguagem da OpenAI.

4. Inicie a aplicação:

   ```bash
   npm start
   ```

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

### `npm start`

Roda a aplicação em modo de desenvolvimento.\
Abra [http://localhost:3000](http://localhost:3000) para visualizar no seu navegador.

A página será recarregada ao fazer mudanças no código.\
Você também verá erros de lint no console.

### `npm test`

Roda os testes interativos em modo watch.\
Veja a seção sobre [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Cria a aplicação para produção na pasta `build`.\
Ela corretamente empacota o React em modo de produção e otimiza a build para a melhor performance.

A build é minificada e os nomes dos arquivos incluem os hashes.\
Sua aplicação está pronta para ser deployada!

Veja a seção sobre [deployment](https://facebook.github.io/create-react-app/docs/deployment) para mais informações.

### `npm run eject`

**Nota: essa é uma operação unilateral. Uma vez que você `eject`, você não pode voltar atrás!**

Se você não está satisfeito com a ferramenta de build e as escolhas de configuração, você pode `eject` a qualquer momento. Esse comando irá copiar todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc) diretamente para o seu projeto, para que você tenha total controle sobre eles. Todos os comandos exceto `eject` ainda funcionarão, mas eles apontarão para os scripts copiados para que você possa modificá-los. Nesse ponto você está por sua conta.

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:
