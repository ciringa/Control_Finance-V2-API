# Goals
Representa uma meta financeira estabelecida pelo usuário.

## Campos
Identificador único da meta.

``Id (String, chave primária)`` 

Título da meta.

``Title (String)``

Valor acumulado até o momento.

``Value (Float, valor padrão: 0)``

Valor alvo da meta.

``TargetedValue (Float, valor padrão: 0)``

Data de criação da meta.
``CreatedAt (DateTime, valor padrão: now())``

Data de conclusão da meta (opcional).

``CompletedAt (DateTime?)``

Data limite para atingir a meta.

``EndTime (DateTime)``

Relacionamento com o usuário proprietário da meta.

``UserNew (User)``

Chave estrangeira para a tabela de usuários.

``userId (String)``