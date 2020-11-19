import random


def generate(default: int, a: int, b: int):

    """
    Generates random integers for test packets in the given range, has a 30% chance to return a default integer.
    """

    isDefault = random.random() <= 0.3
    if isDefault:
        return default
    else:
        return random.randint(a, b)
