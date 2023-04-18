# linguaFarm



## Improvements 

Directly parse and store data into the database and then have event-driven system to trigger all translations to happen in the background ;



## Migration

```bash
    npx sequelize-cli migration:generate --name create-farmers-table
    npx sequelize-cli init
    npx sequelize-cli db:migrate
```