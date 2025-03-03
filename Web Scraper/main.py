from bs4 import BeautifulSoup
from requests import get
import Character
import Perk


WIKI_URL = r"https://deadbydaylight.wiki.gg"


def get_survivor_data() -> list:
    response = get(r"https://deadbydaylight.wiki.gg/wiki/Survivors")
    soup = BeautifulSoup(response.text, "html.parser")

    survivor_list = [Character.Survivor(0, "All Survivors", WIKI_URL + "/images/b/b3/IconHelpLoading_survivor.png")]
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
        survivor_list.append(Character.Survivor(survivor_id, survivor_name, survivor_image))
    # [print(x) for x in survivor_list]

    # Get list of survivor perks

    return [survivor_list, survivor_perk_list]


def get_killer_data() -> list:
    response = get(r"https://deadbydaylight.wiki.gg/wiki/Killers")
    soup = BeautifulSoup(response.text, "html.parser")

    killer_list = [Character.Killer(0, "All Killers", "", WIKI_URL + "/images/0/06/IconHelpLoading_killer.png")]
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
        killer_list.append(Character.Killer(killer_id, killer_name, killer_title, killer_image))
    # [print(x) for x in killer_list]

    # Get list of killer perks

    return [killer_list, killer_perk_list]


def main():
    survivor_data = get_survivor_data()
    killer_data = get_killer_data()


if __name__ == '__main__':
    main()
