import requests as rq
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
from datetime import datetime
from dateutil.relativedelta import relativedelta
import multiprocessing as mp
import numpy as np
import time

def link(time):
    options = webdriver.ChromeOptions()
    options.add_argument('headless') #크롬 창을 띄울지 안 띄울지 결정
    options.add_argument("disable-gpu") #gpu 사용하지 않음
    options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)"+ "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"); #bot 이 아님을 표현
    options.add_argument("window-size=1920x1080")
    driver = webdriver.Chrome('chromedriver',options=options)
    url ="https://www.card-gorilla.com/chart/check100?term=monthly&date="+'-'.join(time)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source,'lxml')
    sleep(2)
    items = soup.select('.text-black')
    cards = list()
    cards_data = dict()
    for item in items:
        cards.append([item.text,"https://www.card-gorilla.com"+item['href']])
    driver.quit()
    return cards
def make_data(card):
    cards_data = dict()
    options = webdriver.ChromeOptions()
    options.add_argument('headless') #크롬 창을 띄울지 안 띄울지 결정
    options.add_argument("disable-gpu") #gpu 사용하지 않음
    options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6)"+ "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"); #bot 이 아님을 표현
    driver1 = webdriver.Chrome('chromedriver',options=options)
    driver1.get(card[1])
    sleep(2)
    soup = BeautifulSoup(driver1.page_source,'lxml')    
    cards_data['이름'] = card[0]
    cards_data['brand'] = soup.select_one('p.brand').text
    bf = soup.find("div", {"class": "lst inner faq_area"})
    cards_data['big_benefit'] = []
    cards_data['small_benefit'] = []
    for i in bf:
            if i.strong.text.strip() == '유의사항':
                if "중단" in i.i.text.strip():
                    cards_data['big_benefit'].append(i.strong.text.strip().replace(",",""))
                    cards_data['small_benefit'].append(i.i.text.strip().replace(",",""))
                continue
            cards_data['big_benefit'].append(i.strong.text.strip().replace(",",""))
            cards_data['small_benefit'].append(i.i.text.strip().replace(",",""))
    driver1.quit()
    return cards_data
#시작
start = time.time()
date = str(datetime.now().date()-relativedelta(months=1))
now = date.split("-")
now[-1] = '01'
cards = link(now)
#멀티프로세스 크롤링
num_cores = mp.cpu_count()
pool = mp.Pool(processes = 6)
cards_data = pool.map(make_data, cards)
f = open("crawling.csv","w",encoding = 'utf-8-sig')
f2 = open('classify.csv','w',encoding = 'utf-8-sig')
f3 = open('data.txt','w')
f.write('이름,카드회사,혜택갯수,')
benefit = ['F' for _ in range(19)]
col = ['카드이름','할인및적립','영화/문화','병원','카페','문화생활','공항','여행/숙박','온라인쇼핑','대중교통','자동차','교육/육아','애완동물','레저/스포츠','식당','금융','통신','통신','공과금','화장품']
classificate = {'네이버페이': 0,'카카오페이': 0,'할인':0,'OK캐시백':0,'OK캐쉬백':0,'캐시백':0,'모든가맹점':0,'해피포인트':0,'수수료우대':0,'적립':0,'간편결제':0,'CJ ONE':0,'생활':0,'영화/문화':1,'영화':1,'생활':1,'병원':2,'병원/약국':2,'카페':3,'카페/디저트':3,'공연/전시':4,'도서':4,'프리미엄 서비스':4,'멤버십포인트':4,'디지털구독':4,'공항라운지/PP':5,'공항라운지':5,'대한항공':5,'저가항공':5,'진에어':5,'아시아나항공':5,'면세점':5,'여행/숙박':6,'렌터카':6,'테마파크':6,'해외이용':6,'해외':6,'온라인쇼핑':7,'쇼핑':7,'홈쇼핑':7,'드럭스토어':7,'APP':7,'대형마트':8,'백화점':8,'마트/편의점':8,'편의점':8,'바우처':8,'소셜커머스':8,'택시':9,'교통':9,'기차':9,'대중교통':9,'주유':10,'주유소':10,'정비':10,'하이패스':10,'학원':11,'교육/육아':11,'애완동물':12,'레저/스포츠':13,'베이커리':14,'점심':14,'패스트푸드':14,'패밀리레스토랑':14,'배달앱':14,'푸드':14,'직장인':14,'금융':15,'은행사':15,'통신':16,'KT':16,'공과금/렌탈':17,'공과금':17,'화장품':18}
no_data = set()
for i in col:
    f2.write(i)
    f2.write(',')
f2.write('\n')
for i in range(1,13):
    f.write("큰혜택이름%d" %i)
    f.write(",")
    f.write("혜택 세부내용%d" %i)
    f.write(",")
f.write("\n")
for i in cards_data:
    f.write(i['이름'])
    f.write(",")
    f2.write(i['이름'])
    f2.write(',')    
    f.write(i['brand'])
    f.write(",")
    f.write(str(len(i['big_benefit'])))
    f.write(",")
    for j in range(len(i['big_benefit'])):
        tmp = i['big_benefit'][j]
        f.write(tmp)
        if tmp in classificate:
            benefit[classificate[tmp]] = 'T'
        else:
            no_data.add(tmp)
        f.write(",")
        f.write(i['small_benefit'][j])
        f.write(",")
    f.write("\n")
    for j in benefit:
        f2.write(j)
        f2.write(',')
    f2.write('\n')
for i in list(no_data):
    f3.write(i)
    f3.write('\n')
f.close()
f2.close()
f3.close()
print(time.time()-start)
