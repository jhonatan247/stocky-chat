if [[ "$OSTYPE" == "linux-gnu" ]]; then
    sudo -s psql -c "DROP DATABASE IF EXISTS stocky_chat" root

    sudo -s psql -c "CREATE DATABASE stocky_chat" root

    sequelize db:migrate
elif [[ "$OSTYPE" == "darwin"* ]]; then
    psql -c "DROP DATABASE IF EXISTS stocky_chat" root

    psql -c "CREATE DATABASE stocky_chat" root

    sequelize db:migrate
fi