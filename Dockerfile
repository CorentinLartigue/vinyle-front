FROM ubuntu:latest
LABEL authors="coren"

ENTRYPOINT ["top", "-b"]