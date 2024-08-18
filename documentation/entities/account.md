# Account
Representa uma conta bancaria de um usuário no sistema.

## Campos


Identificador único da conta.

``Id (String, chave primária)``

Nome da conta.

``Name (String) ``

Valor atual na conta.

``Value (Float, valor padrão: 0)``

Relacionamento com o usuário proprietário da conta.

``UserNew (User)``

Chave estrangeira para a tabela de usuários.

``userId (String)``

Lista de transações associadas a esta conta.

``TransactionsList (Transaction[])``