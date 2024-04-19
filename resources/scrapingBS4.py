import requests
from bs4 import BeautifulSoup

url = 'https://www.brainyquote.com/topics/motivational-quotes'
r = requests.get(url)

soup = BeautifulSoup(r.content, 'html5lib')
print(soup.prettify())
