# User
Representa um usuário no sistema.

## Campos

Identificador único do usuário.

``Id (String, chave primária)``

Email do usuário.

``Email (String, único)``

Senha do usuário.

``Senha (String)``

Nome de usuário.

``UsernName (String)``

 Lista de <a href="./account.md">contas</a> associadas ao usuário.

``AccountList (Account[])``

 Lista de <a href="./goal.md">metas</a> associadas ao usuário.
 
``GoalList (Goals[])``