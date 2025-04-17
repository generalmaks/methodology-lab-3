FROM alpine:3.19

WORKDIR /app

RUN apk add --no-cache python3 py3-pip

#FOR DEBUGGING PURPOSES:
RUN apk add tree

RUN python3 -m venv /app/.venv

COPY requirements/backend.in .

RUN /app/.venv/bin/pip install --no-cache-dir -r backend.in

COPY . .

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8080

RUN /app/.venv/bin/pip list
RUN ls -l /app/.venv/bin

CMD ["/app/.venv/bin/uvicorn", "spaceship.main:app", "--host=0.0.0.0", "--port=8080"]