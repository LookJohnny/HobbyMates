import nltk
import sys
import json
from nltk.corpus import wordnet as wn
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
import spacy

# 加载SpaCy的英语模型
nlp = spacy.load('en_core_web_md')

nltk.download('omw-1.4', quiet=True)

# 词形还原器初始化
lemmatizer = WordNetLemmatizer()

def preprocess_skill(skill):
    """将技能预处理成标准形式"""
    doc = nlp(skill.lower())  # 使用SpaCy处理技能以获得上下文化的词形
    lemmas = [token.lemma_ for token in doc]  # 获取每个词的基本形式
    preprocessed_skill = ' '.join(lemmas)
    return preprocessed_skill

def match_skill(skill_require, skills_provide):
    """匹配技能要求与提供的技能"""
    preprocessed_require = preprocess_skill(skill_require)
    require_doc = nlp(preprocessed_require)
    max_similarity = 0
    for skill in skills_provide:
        preprocessed_provide = preprocess_skill(skill)
        provide_doc = nlp(preprocessed_provide)
        similarity = require_doc.similarity(provide_doc)
        if similarity > max_similarity:
            max_similarity = similarity
            
    return max_similarity

if __name__ == '__main__':
    # 获取命令行参数
    skill_require = sys.argv[1]
    skills_provide = json.loads(sys.argv[2])

    # 调用匹配函数并打印结果
    max_similarity = match_skill(skill_require, skills_provide)
    print(max_similarity)
