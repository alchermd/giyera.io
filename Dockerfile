FROM python:3.8-alpine

LABEL org.opencontainers.image.authors="John Alcher M. Doloiras"

WORKDIR /usr/src/web

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev gcc jpeg-dev zlib-dev libffi-dev

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENTRYPOINT [ "./entrypoint.sh" ]