FROM python:3.12-slim

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    build-essential \
    libssl-dev \
    libffi-dev \
    python3-dev \
    build-essential \
    libjpeg-dev \
    zlib1g-dev \
    gcc \
    libc-dev \
    bash \
    vim \
    && pip3 install --upgrade pip


ENV LIBRARY_PATH=/lib:/usr/lib

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt /app/
COPY . /app/
COPY .env /app/

RUN pip3 --no-cache-dir install -r requirements.txt

#RUN python manage.py makemigrations
##RUN python manage.py migrate
##RUN python manage.py createcachetable
#
#RUN if [ -n "$DJANGO_SUPERUSER_USERNAME" ]; then \
#        python manage.py createsuperuser \
#        --noinput \
#        --username "admin" \
#        --email "admin@admin.fr"; \
#    fi
#
## Définir la commande d'entrée pour le conteneur
#ENTRYPOINT ["sh", "-c"]
#
## La commande par défaut à exécuter lorsque le conteneur démarre
#CMD ["exec $@"]
#

