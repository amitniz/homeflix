from pymongo import MongoClient
import os,imdb

LOCATION = '/Volumes/Elements/DB'
DATABASE = 'homeFlix'
HOST = 'mongo'
PORT = 27017

client = MongoClient(HOST,PORT)
db = client[DATABASE]

types = ['movies','series']
genres = ['action','comedy','thriller','drama','adventure']

#scans the directory without hidden files.
def scan_dir(path):
    for file in os.listdir(path):
        if not file.startswith('.'):
            yield file

#creates name from the directory name.
def name(item):
    return item.replace('_',' ').title()

print( "----------------------------\n[+] Updating the database..\n----------------------------")
for t in types:
    for g in genres:
        item_list = scan_dir(os.path.join(LOCATION,t,g))
        #debug
        for item in item_list:
            src = os.path.join(t,g,item)
            if t == 'series':
                seasons = [s for s in scan_dir(os.path.join(LOCATION,src)) if os.path.isdir(os.path.join(LOCATION,src,s))]
                seasons_list=[]
                for s in sorted(seasons):
                    seasons_list.append([int(s.strip('s')),len([f for f in scan_dir(os.path.join(LOCATION,t,g,item,s))])])

                sub_dirs = dict(zip(['src','location','genre','name','seasons'],
                    [src,LOCATION,g,name(item),seasons_list]))
                if db.series.count_documents({"name":name(item)})==0:
                    db.series.insert_one(sub_dirs)
                    print( "[+] Inserted: ", sub_dirs)
                elif db.series.find_one({"name":name(item)})['seasons']!=seasons_list:
                    print( "[+}Updated: ",sub_dirs)
                    db.series.update_one({"name":name(item)},sub_dirs)
            else:
                sub_dirs = dict(zip(['src','location','genre','name'],[src,LOCATION,g,name(item)]))
                if db.movies.count_documents({"name":name(item)})==0:
                    db.movies.insert_one(sub_dirs)
                    print( "[+] Updated: ", sub_dirs)
print( "[+] Done..")
