FROM python:3.10.5-slim

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN pip install -r /app/requirements.txt

ENTRYPOINT ["python", "main.py"]
