FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN python generate_protos.py
EXPOSE 50051
CMD ["python", "server.py"]
