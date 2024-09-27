FROM python:3.10-slim as builder

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && apt-get clean

RUN pip install poetry

ENV POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

COPY poetry.lock pyproject.toml /app/

RUN poetry install --no-dev --no-root

FROM python:3.10-slim

RUN apt-get update && apt-get install -y \
    libgomp1 \
    && apt-get clean

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY . /app

WORKDIR /

EXPOSE 8001

ENV PYTHONPATH=/app/

CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8001"]

