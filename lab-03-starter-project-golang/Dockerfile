FROM golang:1.24

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN mkdir -p build
RUN go build -o build/fizzbuzz .

EXPOSE 8080

# Command to run the executable
CMD ["build/fizzbuzz", "serve"]