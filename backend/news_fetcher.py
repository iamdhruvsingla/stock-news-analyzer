import requests

API_KEY = "a08d6a1f68964e30982c09b89fa1090f"

def fetch_latest_news(ticker=None):
    query = ticker if ticker else "stocks OR NASDAQ OR Dow Jones OR S&P"
    url = (
        f"https://newsapi.org/v2/everything?"
        f"q={query}&"
        f"sortBy=publishedAt&"
        f"language=en&"
        f"apiKey={API_KEY}"
    )
    response = requests.get(url)
    data = response.json()
    articles = data.get("articles", [])
    headlines = [
        {
            "title": article["title"],
            "url": article["url"],
            "publishedAt": article["publishedAt"]
        }
        for article in articles[:5]
    ]
    return headlines
