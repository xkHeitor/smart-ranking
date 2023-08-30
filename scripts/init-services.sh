#!/bin/bash

# Esperar até que o serviço S3 esteja disponível
while ! nc -z localhost 4566; do
  sleep 1
done

# Criar o bucket
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket smart-ranking-bucket

echo "Bucket criado com sucesso!"


# Esperar até que o serviço rabbitmq esteja disponível
while ! nc -z localhost 15672; do
  sleep 1
done

# Criar o vhost
rabbitmqctl add_vhost smart-ranking

echo "vhost criado com sucesso!"
