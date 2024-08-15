
const yaml = require('js-yaml');
const fs   = require('fs');

export function loadYml(){
  try {
    // Carrega o conteúdo do arquivo .yml
    const fileContents = fs.readFileSync('src/lib/swagger.yml', 'utf8');
    // Converte o conteúdo YAML para um objeto JavaScript
    const data = yaml.load(fileContents);
  
    //console.log(data); // Exibe o objeto JavaScript
    return data
  } catch (e) {
    console.log(e);
  }
}

