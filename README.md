# linguaFarm
linguaFarm is a Node.js application that allows farmers to upload CSV files containing their data, which is then translated into different languages using the Google Cloud Translation API.

## Running the Application
To run the application, first ensure that Docker is installed on your machine. Then, navigate to the project directory and run the following command:

```bash
docker-compose up  # to run database 
```
This will start the PostgreSQL database in a Docker container.


## Database Migration
To run the database migration scripts, use the following commands:

```bash
    npx sequelize-cli migration:generate --name create-farmers-table
    npx sequelize-cli init
    npx sequelize-cli db:migrate
```
To undo the migration, use the following commands:
```bash
    npx sequelize-cli db:migrate:undo
    npx sequelize-cli db:migrate:undo:all
```

## Improvements
The following improvements can be made to the application:

1. Directly parse and store data into the database and then have an event-driven system to trigger all translations to happen in the background.

2. Store data in a separate FarmerTranslations table. The Farmers table schema will only store the original data. When inserting translated data, first insert the original data into the Farmers table and then insert the translated data into the FarmerTranslations table with the corresponding farmerId.
