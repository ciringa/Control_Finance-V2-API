<p align="center">

<img src = "https://img.shields.io/badge/NPM-10.5.2-gray?style=flat&labelColor=green">
<img src = "https://img.shields.io/badge/TypeScript-5.4.5-gray?style=flat&labelColor=blue" >

</p>


# Control Finance V2 💵🪙
Esta é a segunda versão do control finance, um projeto FullStack em desenvolvimento com parceria do meu amigo <a href="https://github.com/ismael-henrique-dev">Ismael Henrique</a>. O projeto em questão objetiva aplicar em prática e desenvolver conhecimentos de alguns dos principais conceitos em uso no mercado. Acesse o <a href="https://github.com/ismael-henrique-dev/Control-Finance-v2">frontEnd da aplicação</a>



## Rodando o Projeto 🚀

clone o repostirorio 
```
git clone https://github.com/ciringa/Control_Finance-V2-API
```
entre na pasta raiz do projeto 
```
cd Control_Finance-V2-API
```
instale as dependencias 
```
npm i
```
rode o projeto 
```
npm run dev
```

### Testes Automatizados ⚙️

Para rodar testes automatizados 
```
npm run test:watch
```
Configs do Vitest e specs em /test

### DOCS 📰
Enquanto estiver rodando a aplicação acesse
```
http://127.0.0.1:2333/docs
```
Ou acesse <a href="https://control-finance-v2-api-1.onrender.com/docs">Documentação</a>

# Tech Stack 

        dotenv: 16.4.5
        fastify: 4.28.1
        prisma: 5.16.1
        typescript: 5.5.3
        vitest: 1.6.0"
        zod: 3.23.8"
        faker":8.4.1

# Vantagens do Uso do TypeScript ⬆️
TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft que é um superconjunto do JavaScript, adicionando tipagem estática opcional. Isso significa que você pode definir tipos para variáveis, funções e objetos, o que ajuda a evitar erros comuns em tempo de compilação. Durante o desenvolvimento do **Control Finance V2 API** as principais vantagens que me fizeram escolher o **TypeScript** foram: 
1. **Tipagem estática:** Ajuda a detectar erros de tipo durante a compilação, aumentando a robustez do código.
2. **Suporte a IDEs:** Ferramentas como Visual Studio Code oferecem autocompletar, refatoração e navegação de código aprimoradas.
3. **Compatibilidade com JavaScript:** TypeScript é totalmente compatível com JavaScript, permitindo a adoção gradual e a utilização de bibliotecas JavaScript existentes.
4. **Código mais legível e mantenível:** A tipagem explícita e os recursos de orientação a objetos melhoram a clareza e a organização do código.
5. **Ferramentas de depuração melhoradas:** Oferece melhores mensagens de erro e facilita a depuração.

Durante o desenvolvimento do CT2, o uso extensivo de TypeScript tornou-se crucial, oferecendo uma ampla gama de facilitadores que permitiram criar uma aplicação limpa, funcional e otimizada.

## Vantagens do Uso de Tokens JWT para aplicaçoes backend ⚙️

O uso de tokens JWT (JSON Web Tokens) em aplicações backend oferece várias vantagens significativas. Primeiramente, os JWTs são auto-contidos, o que significa que todas as informações necessárias para a autenticação e autorização estão embutidas no próprio token, eliminando a necessidade de consultas constantes ao banco de dados. Além disso, eles são seguros e podem ser assinados digitalmente, garantindo a integridade dos dados e impedindo alterações maliciosas. A portabilidade dos tokens JWT facilita a implementação de autenticação entre diferentes serviços e plataformas, proporcionando uma experiência de usuário mais fluida. Por fim, os JWTs são leves e baseados em padrões amplamente adotados, como JSON, o que os torna eficientes para transmissões via HTTP e fáceis de implementar com

