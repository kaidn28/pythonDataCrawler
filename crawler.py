import urllib
from bs4 import BeautifulSoup as bs
from urllib import request as request

url = 'https://vnexpress.net'
page = request.urlopen(url)
soup = bs(page, 'html.parser')
new_feed = soup.find('section', class_ = 'featured container clearfix').find('a')
print(new_feed)