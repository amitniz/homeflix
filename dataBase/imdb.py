import requests,json,os

url = "https://movie-database-imdb-alternative.p.rapidapi.com/"

headers = {
    'x-rapidapi-host': "movie-database-imdb-alternative.p.rapidapi.com",
    'x-rapidapi-key': os.environ['IMDB_KEY']
    }


def search_by_title(title):
    query_string = {'r':'json','s':title}
    res = requests.request('GET',url,headers=headers,params=query_string)
    return json.loads(res.text)['Search'][0] if 'Search' in json.loads(res.text) else None


def extract_imdb_ID(res):
    return res['imdbID']

def query_imdb(title):
    search_res = search_by_title(title)
    if search_res:
        imdb_ID = extract_imdb_ID(search_res)

        query_string ={'i': imdb_ID,'r':'json'}
        response = requests.request('GET',url,headers=headers,params=query_string)
        return json.loads(response.text)
    else:
        print("[!] Couldn't find {}".format(title))
        return None
