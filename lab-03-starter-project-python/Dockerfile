FROM alpine:3.19

WORKDIR /app

RUN apk add --no-cache python3 py3-pip

RUN python3 -m venv /app/.venv

COPY requirements/backend.in .

RUN /app/.venv/bin/pip install --no-cache-dir -r backend.in

COPY . .

EXPOSE 8080

CMD ["/app/.venv/bin/uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8080"]