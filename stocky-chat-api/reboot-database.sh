if [[ "$OSTYPE" == "linux-gnu" ]]; then
    sudo -s psql -c "DROP DATABASE IF EXISTS stocky_chat" postgres

    sudo -s psql -c "CREATE DATABASE stocky_chat" postgres

    sequelize db:migrate
elif [[ "$OSTYPE" == "darwin"* ]]; then
    psql -c "DROP DATABASE IF EXISTS stocky_chat" postgres

    psql -c "CREATE DATABASE stocky_chat" postgres

    sequelize db:migrate
fi