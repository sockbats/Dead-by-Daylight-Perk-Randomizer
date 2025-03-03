class Perk:
    def __init__(self, perk_id: int, icon: str, name: str, description: str):
        self.perk_id = perk_id
        self.icon = icon
        self.name = name
        self.description = description


class SurvivorPerk(Perk):
    def __init__(self, perk_id: int, icon: str, name: str, description: str, survivor: str):
        super().__init__(perk_id, icon, name, description)
        self.survivor = survivor
        self.survivor_id = None

    def __str__(self):
        return (f"Survivor Perk:\n"
                f"ID: {self.perk_id}\n"
                f"Name: {self.name}\n"
                f"Survivor: {self.survivor}\n"
                f"Icon: {self.icon}\n"
                f"Description:\n{self.description}")


class KillerPerk(Perk):
    def __init__(self, perk_id: int, icon: str, name: str, description: str, killer: str):
        super().__init__(perk_id, icon, name, description)
        self.killer = killer
        self.killer_id = None

    def __str__(self):
        return (f"Killer Perk:\n"
                f"ID: {self.perk_id}\n"
                f"Name: {self.name}\n"
                f"Killer: {self.killer}\n"
                f"Icon: {self.icon}\n"
                f"Description:\n{self.description}")