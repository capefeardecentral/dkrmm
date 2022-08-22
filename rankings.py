import reignmakers
import pandas as pd
import redis
import json

class Rankings():
    def __init__(self):
        self.cache = redis.Redis(host='cache', port=6379, db=0)

    def make_rankings(self):
        rm = reignmakers.Reignmakers()

        marketplace = rm.get_marketplace()

        mpdf = pd.DataFrame(marketplace)
        rankdf = pd.read_csv('data/rankings.csv')

        rankdf = rankdf.rename(columns={'PLAYER NAME': 'name', 'POS': 'position_rank'})
        mpdf = mpdf.rename(columns={'dkPlayerNumber': 'dk_player_number'})

        combodf = pd.merge(rankdf, mpdf, on='name')

        combodf = combodf[['name', 'dk_player_number', 'position_rank']]

        combodf.drop_duplicates(subset=['dk_player_number'], inplace=True, ignore_index=True)

        map = pd.Series(combodf.position_rank.values, index=combodf['dk_player_number']).to_dict()

        final = json.dumps(map)

        self.cache.set('rankings', final)

        return final

    def get_rankings(self):
        rankings = self.cache.get('rankings')
        if rankings is None:
            rankings = self.make_rankings()
        return rankings
