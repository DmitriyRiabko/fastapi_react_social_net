from fastapi import FastAPI

app = FastAPI(title="Social Network API")


@app.get("/")
def root():
    return "Hello"

