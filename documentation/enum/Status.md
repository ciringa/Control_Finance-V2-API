Enum used to evaluate account status 

```Example
 Danger = "Danger", // red flag
 Ok = "Ok", // yellow flag
 Good = "Good" // green flag
```

usado em:

```Example
export interface opnionList {
    AndamentoDasMetas: Status, // checks if the metas are greater than a preseted amount
    GastosEssenciais: Status, // 
    Investimentos: Status,
    Economista: Status
}

```