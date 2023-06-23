# 
FROM python:3.9

RUN mkdir /code

WORKDIR /code

RUN python3 -m pip install replicate pytube fastapi uvicorn

COPY . .

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=80"]