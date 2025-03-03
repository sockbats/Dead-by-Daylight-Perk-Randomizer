from bs4 import BeautifulSoup
from requests import get
import json
from Character import Survivor, Killer
from Perk import SurvivorPerk, KillerPerk


WIKI_URL = r"https://deadbydaylight.wiki.gg"


def get_survivor_data() -> list:
    response = get(r"https://deadbydaylight.wiki.gg/wiki/Survivors")
    soup = BeautifulSoup(response.text, "html.parser")

    survivor_list = [Survivor(0, "All Survivors", WIKI_URL + "/images/b/b3/IconHelpLoading_survivor.png")]
    survivor_perk_list = []

    # Get list of survivors
    list_start = soup.select("span#List_of_Survivors")[0].parent
    survivors_data = list_start.find_all_next("div")[0]
    survivors = survivors_data.children
    for survivor in survivors:
        if survivor == "\n":
            continue
        survivor_id = len(survivor_list)
        survivor_name = survivor.find_next("a").text
        survivor_image = WIKI_URL + survivor.find_next("img")["src"]
        survivor_list.append(Survivor(survivor_id, survivor_name, survivor_image))
    # [print(x) for x in survivor_list]

    # Get list of survivor perks
    list_start = soup.select("span#List_of_Survivor_Perks")[0].parent
    survivor_perk_data = list_start.find_all_next("tbody")[0].find_all("tr")
    survivor_perk_data.pop(0)
    for perk in survivor_perk_data:
        perk_id = len(survivor_perk_list)
        perk_icon = (WIKI_URL + perk.find_next("img")["src"]).replace("thumb/", "").split("/96px")[0]
        perk_name = perk.find_all("th")[1].text.strip()
        perk_description = perk.find("td").text.strip()
        perk_survivor = perk.find_all("th")[2].find("a")["title"] if perk.find_all("th")[2].find("a") else "All Survivors"
        survivor_perk_list.append(SurvivorPerk(perk_id, perk_icon, perk_name, perk_description, perk_survivor))
    # [print(x) for x in survivor_perk_list]

    return [survivor_list, survivor_perk_list]


def get_killer_data() -> list:
    response = get(r"https://deadbydaylight.wiki.gg/wiki/Killers")
    soup = BeautifulSoup(response.text, "html.parser")

    killer_list = [Killer(0, "All Killers", "All Killers", WIKI_URL + "/images/0/06/IconHelpLoading_killer.png")]
    killer_perk_list = []

    # Get list of killers
    list_start = soup.select("span#List_of_Killers")[0].parent
    killers_data = list_start.find_all_next("div")[0]
    killers = killers_data.children
    for killer in killers:
        if killer == "\n":
            continue
        killer_id = len(killer_list)
        killer_name = killer.find_next("a").text
        killer_title = list(killer.children)[1].strip()
        killer_image = WIKI_URL + killer.find_next("img")["src"]
        killer_list.append(Killer(killer_id, killer_name, killer_title, killer_image))
    # [print(x) for x in killer_list]

    # Get list of killer perks
    list_start = soup.select("span#List_of_Killer_Perks")[0].parent
    killer_perk_data = list_start.find_all_next("tbody")[0].find_all("tr")
    killer_perk_data.pop(0)
    for perk in killer_perk_data:
        perk_id = len(killer_perk_list)
        perk_icon = (WIKI_URL + perk.find_next("img")["src"]).replace("thumb/", "").split("/96px")[0]
        perk_name = perk.find_all("th")[1].text.strip()
        perk_description = perk.find("td").text.strip()
        perk_killer = "The " + perk.find_all("th")[2].find("a").text if perk.find_all("th")[2].find(
            "a") else "All Killers"
        killer_perk_list.append(KillerPerk(perk_id, perk_icon, perk_name, perk_description, perk_killer))
    # [print(x) for x in killer_perk_list]

    return [killer_list, killer_perk_list]


def export_to_json(data: list, file_path: str):
    json_list = json.dumps([obj.__dict__ for obj in data])
    with open(file_path, "w") as f:
        f.write(json_list)


def main():
    survivor_list, survivor_perk_list = get_survivor_data()
    killer_list, killer_perk_list = get_killer_data()

    survivor_dict = {survivor.name: survivor.survivor_id for survivor in survivor_list}
    for perk in survivor_perk_list:
        perk.survivor_id = survivor_dict.get(perk.survivor)

    killer_dict = {killer.title: killer.killer_id for killer in killer_list}
    for perk in killer_perk_list:
        perk.killer_id = killer_dict.get(perk.killer)

    export_to_json(survivor_list, "Data Output/survivor_list.json")
    export_to_json(survivor_perk_list, "Data Output/survivor_perk_list.json")
    export_to_json(killer_list, "Data Output/killer_list.json")
    export_to_json(killer_perk_list, "Data Output/killer_perk_list.json")


if __name__ == '__main__':
    main()
