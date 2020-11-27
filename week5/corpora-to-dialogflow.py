"""
how to run:
    python corpora-to-dialogflow.py [OBJECT KEY] [INPUT FILE NAME] [OUTPUT FILENAME]
for example, for https://github.com/dariusk/corpora/blob/master/data/foods/vegetables.json, run:
    python corpora-to-dialogflow.py vegetables vegetables.json vegetables-output.json
"""

import json
import sys

results = []

with open(sys.argv[2]) as data_file:
    data = json.load(data_file)
    for word in data[sys.argv[1]]:
        word_obj = {}
        word_obj['value'] = word
        word_obj['synonyms'] = [word]
        results.append(word_obj)
        
with open(sys.argv[3], 'w') as results_file:
    print results
    json.dump(results, results_file)
    
