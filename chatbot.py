import sys
import re
import random

# Sentences we'll respond with if the user greeted us
GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "hey")

GREETING_RESPONSES = ["Well hello there!", "How\'s it going?", "Anything I can help you with?", "Tip of the hat to you"]

def check_for_greeting(sentence):
    wordList = re.sub("[^\w]", " ",  sentence).split()
    """If any of the words in the user's input was a greeting, return a greeting response"""
    for word in wordList:
        if word.lower() in GREETING_KEYWORDS:
            print(random.choice(GREETING_RESPONSES))
            sys.stdout.flush()

check_for_greeting(sys.argv[1])
