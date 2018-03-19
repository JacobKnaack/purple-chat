import sys
import re
import random

# Sentences we'll respond with if the user greeted us
GREETING_KEYWORDS = ("hello", "hi", "greetings", "sup", "hey", "yo")

INTERROGATIVES = ("what", "who", "whose", "which", "where", "how", "why", "when", "what\'s", "whats")

PHIL_QUOTES = ("The unexamined life is not worth living.", "whereof one cannot speak, thereof one must be silent.", "Entities should not be multiplied unnecessarily.", "Entities should not be multiplied unnecessarily.", "The life of man (in a state of nature) is solitary, poor, nasty, brutish, and short.", "I think therefore I am.", "He who thinks great thoughts, often makes great errors.", "We live in the best of all possible worlds.", "What is rational is actual and what is actual is rational.", "God is dead! He remains dead! And we have killed him.", "There is but one truly serious philosophical problem, and that is suicide", "One cannot step twice in the same river", "The greatest happiness of the greatest number is the foundation of morals and legislation", "To be is to be perceived", "Happiness is not an ideal of reason but of imagination", "No man's knowledge here can go beyond his experience", "God is not willing to do everything, and thus take away our free will and that share of glory which belongs to us", "Liberty consists in doing what one desires", "It is undesirable to believe a proposition when there is no ground whatever for supposing it true", "Even while they teach, men learn.", "There is only one good, knowledge, and one evil, ignorance.", "If God did not exist, it would be necessary to invent Him.","This is patently absurd; but whoever wishes to become a philosopher must learn not to be frightened by absurdities", "One cannot conceive anything so strange and so implausible that it has not already been said by one philosopher or another", "Leisure is the mother of philosophy", "Philosophy is a battle against the bewitchment of our intelligence by means of language", "There is only one thing a philosopher can be relied upon to do, and that is to contradict other philosophers")

answered = False

def answer_query():
    print(random.choice(PHIL_QUOTES))
    sys.stdout.flush()

def greet(username):
    print('Hello ' + username + '! What\'s on your mind?')
    sys.stdout.flush()

wordList = re.sub("[^\w]", " ",  sys.argv[1]).split()
for word in wordList:
    if word.lower() not in GREETING_KEYWORDS and word.lower() in INTERROGATIVES:
        answer_query()
        answered = True

for word in wordList:
    if word.lower() in GREETING_KEYWORDS and answered == False:
        greet(sys.argv[2])
