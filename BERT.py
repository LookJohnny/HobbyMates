import nltk
from nltk.corpus import wordnet as wn
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import spacy

# 加载SpaCy的英语模型
nlp = spacy.load('en_core_web_md')

nltk.download('omw-1.4')

# 词形还原器初始化
lemmatizer = WordNetLemmatizer()

def preprocess_skill(skill):
    """将技能预处理成标准形式"""
    doc = nlp(skill.lower())  # 使用SpaCy处理技能以获得上下文化的词形
    lemmas = [token.lemma_ for token in doc]  # 获取每个词的基本形式
    preprocessed_skill = ' '.join(lemmas)
    return preprocessed_skill

def get_synonyms(word):
    """获取给定单词的同义词集合"""
    synonyms = set()
    for synset in wn.synsets(word):
        for lemma in synset.lemmas():
            synonyms.add(lemma.name().replace('_', ' '))
    return synonyms

def match_skill(skill_require, skills_provide):
    """匹配技能要求与提供的技能"""
    preprocessed_require = preprocess_skill(skill_require)

    # 使用SpaCy的文本相似度来匹配技能
    require_doc = nlp(preprocessed_require)
    for skill in skills_provide:
        preprocessed_provide = preprocess_skill(skill)
        provide_doc = nlp(preprocessed_provide)
        # if require_doc.similarity(provide_doc) > 0.5:  # 设定一个阈值以确定匹配程度
        #     return True

    # return False
    return require_doc.similarity(provide_doc)

# 使用例子
skill_require = "driving"
skills_provide = ["football", "write", "body building", "game", "chess", " racing"]

print(match_skill(skill_require, skills_provide) )
