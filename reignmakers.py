import requests


class Reignmakers:
    def __init__(self):
        self.marketplace_url = "https://marketplace.draftkings.com/api/marketplaces/v1/collections/5eae2563006d4fe0ae1405a31567c60c/merchandise?selectedValueIdsByAttributeId={18:[62,63,64,68]}&limit=5000&&resultType=Collectible"
        self.card_root_url = "https://marketplace.draftkings.com/api/marketplaces/v1/collectibles/"
        self.portfolio_root_url = "https://marketplace.draftkings.com/api/users/v1/portfolios/"

    def get_marketplace(self):
        mp = requests.get(self.marketplace_url, headers={"Accept": "application/json"})
        clean_players = []
        for p in mp.json()["merchandise"]:
            values = {}
            for k in p["collectionAttributes"]:
                match k["displayName"]:
                    case "Athlete Name":
                        values["name"] = k["value"]
                        continue
                    case "Position":
                        values["position"] = k["value"]
                        continue
                    case "Edition Tier":
                        values["tier"] = k["value"]
                        continue
                    case "PlayerDkId":
                        values["dkPlayerNumber"] = k["value"]
                        continue
                    case "Position":
                        values["position"] = k["value"]
                        continue
                    case "Rarity Tier":
                        values["rarity"] = k["value"]
                        continue
                    case "Rookie Status":
                        values["rookie"] = k["value"]
                        continue
                    case "Series":
                        values["series"] = k["value"]
                        continue
                    case "Set Name":
                        values["set"] = k["value"]
                        continue
                    case "SuperStar Status":
                        values["superstar"] = k["value"]
                        continue
                    case _:
                        continue

            try:
                clean_player = {
                    "name": values["name"],
                    "floor": p["lowestListedEditionPrice"],
                    "tier": values["tier"],
                    "dkPlayerNumber": values["dkPlayerNumber"],
                    "position": values["position"],
                    "rarity": values["rarity"],
                    "rookie": values["rookie"],
                    "series": values["series"],
                    "set": values["set"],
                    "superstar": values["superstar"],
                    "merchandiseKey": p["merchandiseKey"]
                }
                clean_players.append(clean_player)
            except Exception as e:
                print(f'error retrieving: {p["merchandiseName"]}: {e}')

        # sort clean_players by name
        clean_players.sort(key=lambda x: x["floor"])

        return clean_players

    def get_transactions(self, player_key):
        transactions = requests.get(self.card_root_url + player_key + "/transactions",
                                    headers={"Accept": "application/json"})
        clean_transactions = [transaction for transaction in transactions.json()["transactions"] if
                              transaction["transactionType"] == "SecondaryPurchaseConfirmation"]
        return clean_transactions

    def get_portfolio(self, user_key):
        portfolio = requests.get(self.portfolio_root_url + user_key,
                                 headers={"Accept": "application/json"})

        portfolio = [p for p in portfolio.json()["collectibleEditions"] if p["collectionName"] == "Reignmakers Football Collection"]
        portfolio_value = self.get_portfolio_values(portfolio)
        return portfolio_value

    def get_portfolio_values(self, portfolio):
        marketplace = self.get_marketplace()
        value = {"floorValue": 0, "cardsTracked": 0}
        holdings = []
        for p in portfolio:
            for m in marketplace:
                if p["collectibleKey"] == m["merchandiseKey"]:
                    holding = m
                    holding["editionNumber"] = p["editionNumber"]
                    holding["editionCount"] = ["rarityCount"]
                    holdings.append(holding)
                    value["floorValue"] += m["floor"]
                    value["cardsTracked"] += 1
                    break

        payload = {"holdings": holdings, "value": value}

        payload["holdings"].sort(key=lambda x: x["floor"], reverse=True)
        return payload
