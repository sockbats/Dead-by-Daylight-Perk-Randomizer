class Perk:
    def __init__(self, perk_id: int, icon: str, name: str, description: str):
        self.perk_id = perk_id
        self.icon = icon
        self.name = name
        self.description = description


class KillerPerk(Perk):
    def __init__(self, perk_id: int, icon: str, name: str, description: str, killer: str):
        super().__init__(perk_id, icon, name, description)
        self.killer = killer
        self.killer_id = None


class SurvivorPerk(Perk):
    def __init__(self, perk_id: int, icon: str, name: str, description: str, survivor: str):
        super().__init__(perk_id, icon, name, description)
        self.survivor = survivor
        self.survivor_id = None
