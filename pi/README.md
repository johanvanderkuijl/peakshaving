# peakshaving arduino
sample code to push data to the google cloud firebase

## installation
pip install -r requirements.txt

## firebase documentation
https://firebase.google.com/docs/firestore/manage-data/add-data

## Protocol
versie 1
```
EAN: Aansluitnummer, bv 12345678

IL_1+: fase 1 verbruik (import)
IL_2+: fase 2 verbruik (import)
IL_3+: fase 3 verbruik (import)

IL_1-: fase 1 teruglevering (export)
IL_2-: fase 2 teruglevering (export)
IL_3-: fase 3 teruglevering (export)

IZ_1: 0,
IZ_2: 0,
IZ_3: 0,

I_1: 15,
I_2: 8,
I_3: 7,

U_1: 230, spanning fase 1
U_2: 230, spanning fase 2
U_3: 230, spanning fase 3
```

versie 2:
De plus en min tekens zijn vervangen door p en m
```
EAN: Aansluitnummer, bv 12345678

IL_1p: fase 1 verbruik (import)
IL_2p: fase 2 verbruik (import)
IL_3p: fase 3 verbruik (import)

IL_1m: fase 1 teruglevering (export)
IL_2m: fase 2 teruglevering (export)
IL_3m: fase 3 teruglevering (export)

IZ_1: 0,
IZ_2: 0,
IZ_3: 0,

I_1: 15,
I_2: 8,
I_3: 7,

U_1: 230, spanning fase 1
U_2: 230, spanning fase 2
U_3: 230, spanning fase 3
```