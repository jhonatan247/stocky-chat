psql -c "DROP DATABASE IF EXISTS stocky_chat" postgres root

psql -c "CREATE DATABASE stocky_chat" postgres root

sequelize db:migrate