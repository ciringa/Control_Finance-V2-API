<h1 align="center">Control Finance V2 💵🪙</h1>
<p align="center">
<img align="center" src = "https://img.shields.io/badge/NPM-10.5.2-gray?style=flat&labelColor=green">
<img align="center" src = "https://img.shields.io/badge/TypeScript-5.4.5-gray?style=flat&labelColor=blue" >
</p>

Esta é a segunda versão do control finance, um projeto FullStack em desenvolvimento com parceria do meu amigo <a href="https://github.com/ismael-henrique-dev">Ismael Henrique</a>. O projeto em questão objetiva aplicar em prática e desenvolver conhecimentos de alguns dos principais conceitos em uso no mercado. Acesse o <a href="https://github.com/ismael-henrique-dev/Control-Finance-v2">frontEnd da aplicação</a>

## Features 💻

- Sistema de controle monetario completo 
- Sistema completo de login e singup utilizando de tokens JWT
- Documentação completa com Swagger
- Testagem autonôma do Vite 

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

### Database seed 🌱
para popular o banco de dados com dados ficticios rode:
```
npx prisma db seed
```

# Tech Stack 
<div align="center">
<img alt="Static Badge" src="https://img.shields.io/badge/dotenv-16.4.5-blue?style=flat-square&logoColor=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/fastify-4.28.1-black?style=flat-square&logoColor=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/prisma-5.16.1-blue?style=flat-square&logoColor=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/typescript-5.5.3-blue?style=flat-square&logoColorr=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/vitest-1.6.0-orange?style=flat-square&logoColorr=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/multer-2.0.3-green?style=flat-square&logoColor=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/zod-3.23.8-red?style=flat-square&logoColor=blue">
<img alt="Static Badge" src="https://img.shields.io/badge/faker-8.4.1-green?style=flat-square&logoColor=blue">

</div>

# O que Aprendi durante o projeto? 🧩

- Vantagens e desvantagens de tecnologias como o swagger e fastify.
- Utilização de bibliotecas até então desconhecidas para mim (multer,lodash,bcryptjs,faker e js-yaml).
- Novos conhecimentos sobre validação, tipagem estática do typeScript e utilização de decorators. 
- Uso de DTOS e Schemas como tambem o aprimoramento de conhecimentos sobre o TypeScript.
- Gerenciamento de arquivos e imagens utilizando do serviço <a href="https://supabase.com/">Supabase</a> como também o modulo Node:FS. 

# Vantagens do Uso do TypeScript ⬆️
TypeScript é uma linguagem de programação de código aberto desenvolvida pela Microsoft que é um superconjunto do JavaScript, adicionando tipagem estática opcional. Isso significa que você pode definir tipos para variáveis, funções e objetos, o que ajuda a evitar erros comuns em tempo de compilação. Durante o desenvolvimento do **Control Finance V2 API** as principais vantagens que me fizeram escolher o **TypeScript** foram: 
1. **Tipagem estática:** Ajuda a detectar erros de tipo durante a compilação, aumentando a robustez do código.
2. **Suporte a IDEs:** Ferramentas como Visual Studio Code oferecem autocompletar, refatoração e navegação de código aprimoradas.
3. **Compatibilidade com JavaScript:** TypeScript é totalmente compatível com JavaScript, permitindo a adoção gradual e a utilização de bibliotecas JavaScript existentes.
4. **Código mais legível e mantenível:** A tipagem explícita e os recursos de orientação a objetos melhoram a clareza e a organização do código.
5. **Ferramentas de depuração melhoradas:** Oferece melhores mensagens de erro e facilita a depuração.

Durante o desenvolvimento do CT2, o uso extensivo de TypeScript tornou-se crucial, oferecendo uma ampla gama de facilitadores que permitiram criar uma aplicação limpa, funcional e otimizada.

## Vantagens do Uso de Tokens JWT para aplicaçoes backend ⚙️

O uso de tokens JWT (JSON Web Tokens) em aplicações backend oferece várias vantagens significativas. Primeiramente, os JWTs são auto-contidos, o que significa que todas as informações necessárias para a autenticação e autorização estão embutidas no próprio token, eliminando a necessidade de consultas constantes ao banco de dados. Além disso, eles são seguros e podem ser assinados digitalmente, garantindo a integridade dos dados e impedindo alterações maliciosas. A portabilidade dos tokens JWT facilita a implementação de autenticação entre diferentes serviços e plataformas, proporcionando uma experiência de usuário mais fluida. Por fim, os JWTs são leves e baseados em padrões amplamente adotados, como JSON, o que os torna eficientes para transmissões via HTTP e fáceis de implementar.

## por que usar testes automatizados (as vantagens do Vite)
Usar <strong>testes automatizados</strong> é essencial para garantir a qualidade e a eficiência no desenvolvimento de software, e o <strong>Vite</strong>, uma ferramenta moderna de build, traz diversas vantagens nesse aspecto. Com sua velocidade impressionante, o Vite reduz significativamente o tempo de feedback durante os testes, permitindo detectar e corrigir erros mais rapidamente. Além disso, sua arquitetura baseada em módulos ES nativos facilita a configuração e a integração com bibliotecas de testes populares, como Jest e Cypress. Isso resulta em um ambiente de desenvolvimento mais ágil e produtivo, onde os desenvolvedores podem se concentrar mais na escrita de código de qualidade do que na resolução de problemas de configuração e desempenho. A adoção de testes automatizados com Vite não só melhora a confiabilidade do software, mas também aumenta a confiança da equipe de desenvolvimento na entrega contínua de novas funcionalidades. 
O vite é a melhor escolha para a realizaçao de <strong>testes automatizados</strong> e no Control Finance V2 foi essencial para garantir o pleno funcionamento da aplicação dando ao desenvolvedor certeza absoluta de que a aplicaçao funcionará nos conformes do que é exigido pelo <strong>FrontEnd</strong>.
