FROM golang:1.24.2-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN mkdir -p build
RUN go build -o build/fizzbuzz .

EXPOSE 8080

CMD ["build/fizzbuzz", "serve"]