import requests

class Reignmakers:
    def __init__(self):
        self.marketplace_url = "https://marketplace.draftkings.com/api/marketplaces/v1/collections/5eae2563006d4fe0ae1405a31567c60c/merchandise?selectedValueIdsByAttributeId={18:[62,63,64]}&limit=5000&&resultType=Collectible"
        self.card_root_url = "https://marketplace.draftkings.com/api/marketplaces/v1/collectibles/"

    def get_marketplace(self):
        mp = requests.get(self.marketplace_url, headers={"Accept": "application/json"})
        clean_players = []
        for p in mp.json()["merchandise"]:
            try:
                clean_player = {
                    "name": p["collectionAttributes"][0]["value"],
                    "floor": p["lowestListedEditionPrice"],
                    "tier": p["collectionAttributes"][1]["value"],
                    "dkPlayerNumber": p["collectionAttributes"][2]["value"],
                    "position": p["collectionAttributes"][3]["value"],
                    "rarity": p["collectionAttributes"][4]["value"],
                    "rookie": p["collectionAttributes"][5]["value"],
                    "series": p["collectionAttributes"][6]["value"],
                    "set": p["collectionAttributes"][7]["value"],
                    "superstar": p["collectionAttributes"][8]["value"],
                    "merchandiseKey": p["merchandiseKey"]
                   }
                clean_players.append(clean_player)
            except:
                f'error retrieving: {p["merchandiseName"]}'

        # sort clean_players by name
        clean_players.sort(key=lambda x: x["floor"])

        return clean_players
