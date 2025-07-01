from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware   # 👈 add this
from ml_model import analyze_sentiment
from news_fetcher import fetch_latest_news
from stock_fetcher import fetch_stock_price

app = FastAPI()

# 👇 add this part
origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI backend"}

@app.get("/news")
def get_news():
    news = fetch_latest_news()
    return {"news": news}

@app.get("/sentiment")
def get_sentiment():
    news = fetch_latest_news()
    titles = [article["title"] for article in news]
    sentiments = [analyze_sentiment(title) for title in titles]
    return {"sentiments": sentiments}


@app.get("/stock/{ticker}")
def get_stock(ticker: str):
    price = fetch_stock_price(ticker)
    return {"ticker": ticker, "price": price}

@app.get("/news/{ticker}")
def get_news_for_ticker(ticker: str):
    news = fetch_latest_news(ticker)
    return {"news": news}

@app.get("/full_info/{ticker}")
def get_full_info(ticker: str):
    news = fetch_latest_news(ticker)
    sentiments = [analyze_sentiment(article["title"]) for article in news]
    price = fetch_stock_price(ticker)
    return {
        "ticker": ticker,
        "price": price,
        "news": news,
        "sentiments": sentiments
    }

@app.get("/stock/history/{ticker}")
def get_stock_history(ticker: str):
    prices, dates = fetch_stock_history(ticker)
    return {"ticker": ticker, "prices": prices, "dates": dates}
