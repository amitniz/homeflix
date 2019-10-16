from pymongo import MongoClient
import os

LOCATION = 'demo'
DATABASE = 'homeFlix'
HOST = 'localhost'
PORT = 27017

client = MongoClient(HOST,PORT)
db = client[DATABASE]

types = ['movies','series']
genres = ['action','comedy','thriller','drama','adventure']


def name(item):
    return item.replace('_',' ').title()

print "----------------------------\n[+] Updating the database..\n----------------------------"
for t in types:
    for g in genres:
        item_list = os.listdir(os.path.join(LOCATION,t,g))
        for item in item_list:
            src = os.path.join(LOCATION,t,g,item)
            if t == 'series':
                seasons = [s for s in os.listdir(os.path.join(LOCATION,t,g,item)) if os.path.isdir(os.path.join(LOCATION,t,g,item,s))]
                episodes=[]
                for s in sorted(seasons):
                    episodes.append(len(os.listdir(os.path.join(LOCATION,t,g,item,s))))

                sub_dirs = dict(zip(['src','location','genre','name','seasons','episodes'],
                    [src,LOCATION,g,name(item),len(seasons),episodes]))
                if db.series.find({"name":item}).count()==0:
                    db.series.insert_one(sub_dirs)
                    print "[+] Updated: ", sub_dirs
            else:
                sub_dirs = dict(zip(['src','location','genre','name'],[src,LOCATION,g,name(item)]))
                if db.movies.find({"name":item}).count()==0:
                    db.movies.insert_one(sub_dirs)
                    print "[+] Updated: ", sub_dirs
print "[+] Done.."
