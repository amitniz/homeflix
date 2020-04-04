import os,sys
from pymongo import MongoClient

LOCATION = sys.argv[2] if len(sys.argv) == 3 else '/Volumes/Elements/DB'
DATABASE = 'homeFlix'
HOST = sys.argv[1] if len(sys.argv) >= 2 else 'mongo'
PORT = 27017

client = MongoClient(HOST,PORT,serverSelectionTimeoutMS=10)

#Check Connection
try:
	client.server_info()
except:
	print('[!] Failed to Connect..')
	exit(1)

db = client[DATABASE]
types = ['movies','series']
genres = ['action','comedy','thriller','drama','adventure','family']

#scan the directory without hidden files.
def scan_dir(path):
    for file in os.listdir(path):
        if not file.startswith('.') and file != 'subs':
            yield file

#create name from the directory name.
def name(item):
    return item.replace('_',' ').title()

print( f"{'-'*30}\n[+] Updating the database..\n{'-'*30}")
for t in types:
    for g in genres:
        item_list = scan_dir(os.path.join(LOCATION,t,g))
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
                    print( "[+] Inserted: ", name(item))
                elif db.series.find_one({"name":name(item)})['seasons']!=seasons_list:
                    print( "[+}Updated: ",name(item))
                    db.series.update_one({"name":name(item)},{'$set':sub_dirs})
            else:
                sub_dirs = dict(zip(['src','location','genre','name'],[src,LOCATION,g,name(item)]))
                if db.movies.count_documents({"name":name(item)})==0:
                    db.movies.insert_one(sub_dirs)
                    print( "[+] Inserted: ", name(item))
print( "Done..")
