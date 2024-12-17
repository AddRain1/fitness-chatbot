# NLTK frameowrk for natural language processing

import nltk
# nltk.download('punkt_tab') # package with pretraiend tokenizer

import numpy as np

# import porterstemmer from nltk
from nltk.stem.porter import PorterStemmer
stemmer = PorterStemmer()

# Tokenize the sentence, or splitting a string into a list of words
def tokenize(sentence):
    return nltk.word_tokenize(sentence)

# Stemming the words, or reducing a word to its root form
def stem(word):
    return stemmer.stem(word.lower())

# Bag of words, or a representation of text that describes the occurrence of words within a document
def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w, in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0

    return bag
