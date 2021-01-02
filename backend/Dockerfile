FROM python:3.8-alpine3.12

RUN python3 -m pip install --upgrade pip

RUN apk add --no-cache --virtual \
        .build_deps \
        libressl-dev \
        musl-dev \
        libffi-dev \
        gcc

RUN pip install poetry
RUN poetry config virtualenvs.create false

WORKDIR /backend

COPY poetry.lock pyproject.toml /backend/
COPY libs/ /backend/libs/
RUN poetry install

COPY . /backend/

CMD gunicorn -b 0.0.0.0:2000 --access-logfile - "backend.app:create_app"