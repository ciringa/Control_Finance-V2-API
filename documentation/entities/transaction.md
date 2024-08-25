# Transaction 
A entidade que define as transações de um usuário 

## Enumerações
As entidades de transações possuem uma lista de enumeraçoes que sao usadas para especificar o funcionamento da entidade

### Type
Define o tipo de transação, podendo ser:
```
DEP: Depósito.
SAL: Saque.
```

### TransactionCategories
Categorias das transações, com diferentes categorias para depósitos e saques.

#### Categorias para Saques:

````
    Alimentacao
    Educacao
    Laser
    Saude
    Eletronicos
    Compras
    Beleza
    Veiculo
    Roupas
````

#### Categorias para Depósitos:

````
    Investimento
    Salario
    Comissao
    Outro
````

## Campos:

Identificador único da transação.

``Id (String, chave primária)``

Título ou descrição da transação.

``Title (String)``

Valor da transação.

``Value (Float)``

Tipo da transação (especificado acima).

``Type (Type)``

Categoria da transação (especificado acima).

``Categories (TransactionCategories)``

Relacionamento com a <a href="./account.md">contas</a> à qual a transação pertence. Todas as transações pertecem a alguma conta


``AccountNew (Account)``

Chave estrangeira para a tabela de <a href="./account.md">contas</a>. Todas as transações pertecem a alguma conta

``accountId (String)``

Data da criação da transação 

``CreatedAt (dateTime)``