import yfinance as yf

def fetch_stock_price(ticker):
    stock = yf.Ticker(ticker)
    todays_data = stock.history(period='1d')
    if todays_data.empty:
        return None
    return todays_data['Close'][0]

def fetch_stock_history(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="7d")
    return hist['Close'].tolist(), hist.index.strftime('%Y-%m-%d').tolist()
